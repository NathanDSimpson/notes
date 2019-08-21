
1. `create-react-app`
2. create server directory with `index.js`
    - add dependencies 
        - express, express-session, massive, bcryptjs, dotenv
```javascript
//index.js inside of server
const express = require('express')
require('dotenv').config() // must come before we use process.env
const app = express()
const massive = require('massive')
const session = require('express-session')

app.use(express.json())
```
3. Create `.env` file at the project root
    - add `SESSION_SECRET` and `SERVER_PORT`
    - add `.env` to `.gitignore`

4. Set up postgress database (heroku -> project -> settings - credentials)
    - get the uri from heroku 
        - use w/ sql tabs
        - add as connection string in .env
            - add "?ssl=true" so tht we dont need a password to access db
5. package.json - set proxy and main
```javascript
    ]
  },
  "proxy": "http://localhost:3333" // <-- so we dont have to hardcode this
  "main": "server/index.js" // <-- tells nodemon where to look
}
```
6. Set up express session:
```javascript
// index.js of server
//Session is a function that takes an object as the argument
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //converting milliseconds into a day
    }
}))
```
7. Connect database (massive) and server
```javascript
///index.js of server
massive(CONNECTION_STRING)
.then(database => {
    app.set('db', database)
    console.log('Database: working')
// by setting up our server inside of massive, our server wont work unless the database is too
    app.listen(SERVER_PORT, () => { 
        console.log(`Server: ${SERVER_PORT}`)
    })
})
```

8. After making sure the database is working (in sqlTabs), pull from the db into the project
    - create a `db` directory  - MUST be at the root of the project
        - we will store our sql commands here 
    - __after doing this, check the endpoint in postman__
        - `get` request @ "http://localhost:3333/api/users"
```javascript
//index.js of server'

app.get('/api/users', (req, res) => {
// must use 'db' or whatever we defined our db instance as in our massive call from above
    const db = req.app.get('db') 
//getAllUsers is the name of the sql file we are invoking from the db directory
    db.getAllUsers().then( data => { 
        res.status(200).send(data)
    })
})
```
```sql
-- getAllUsers.sql
select * from users;
```

9. For large apps, the callback functions from the app.CRUD calls (step 8 above) should be stored in a controller.js file. 
```javascript
// controller.js

module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db')
        db.getAllUsers().then( data => {
            res.status(200).send(data)
        })
    }
}
```
```javascript
//index.js
const ctrl = require('./controller')
```
10. Register a user. write the sql files, controller function, and endpoint.
    - This time our `request` will have a body (`req.body`)
    -  This time we will use `async await` instead of `.then`
    - This controller file will call several sql files and use the data returned from them
```javascript
// controller.js
const bcrypt = require('bcryptjs')

------------------------

register: async (req, res) => {
    const db = req.app.get('db')
    const { email, firstname, lastname, username, password} = req.body
    const { session } = req
    let emailTaken = await db.checkEmail({email}) 
    // checkEmail is a sql file to check if user exists in our db
    // We pass an object as the argument for our sql file/command
    emailTaken = +emailTaken[0].count 
    //checkEmail.sql returned an array with an object at index 0, containing an attribute 'count'. We turn this from string to int
    if(emailTaken !== 0) {
        return res.sendStatus(409) //stop  execution and send an error. The user already exists.
    }
//
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
}
```

```sql
-- checkEmail.sql
-- we use count this function returns a 1 if use exists, else 0
select count(*) from users
where email = ${email};
```

```sql
-- registerUser.sql
insert into user_login (username, password) -- this is our hashed password
values (
    ${username},
    ${hash}
)
returning username, password; -- Return these so we can put them onto our session

insert into users 
(firstname, lastname, email)
values (
    ${firstname},
    ${lastname},
    ${email}
);

insert into balances
(balance)
values (
    0
) 
returning balance_id; -- so we can use this in our javascript. This should be the same id for all three tables.
```
```javascript
// index.js of server
app.post('/auth/register', ctrl.register)
```
- check this all via postman 
    - use `post`, and the correct endpoint: `http://localhost:3333/auth/register`
        - include a body with the correct format (raw - JSON (application/json))
     - after doing this, do another get request to make sure the data was added properly

```javascript
// body of the postman post request
    {
        "firstname": "Tay",
        "lastname": "Powers",
        "email": "TFP@gmail.com",
        "username": "Taypow",
        "password": "password"
    }
```
11. Create the login

```javascript
//controllers.js

    login: async (req, res) => {
        const db = req.app.get('db') // get access to our db
        const { session } = req // get the session object
        const {loginUsername : username} = req.body 
// this is destructuring w/ aliasing
// called loginUsername because it is different than the 'username' from register
        try {
            let user = await db.login({username})  
// our sql file, will return info about the user associated with the username entered
            session.user = user[0] 
// this adds the user to the session so they dont have to log in after registering
            const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password) // comparing password hashes
            if(authenticated){
                res.status(200).send({authenticated, use_id: user[0].login_id})
            } else {
                throw new Error(401)
 // if (!authenticated) there is technically no error, so this makes sure we throw an error if the user is not authenticated
            }
        } catch(err){
            res.sendStatus(401)
        }
    }
````
```javascript
    //index.js of server
    app.post('/auth/login', ctrl.login)
```
- Test this with a postman `post` using a body that includes username and password
    - Make sure this is for a registered user and to have the correct password
```json
{
	"loginUsername": "nate_simpson",
	"loginPassword": "password"
}
```

12. Once logged in, get the user details.
    - add a controller.js function
    - add an endpoint in index.js of server
    - create appropriate sql files
    __TEST VIA POSTMAN__ - if it doesn't work, restart your server (nodemon)

```javascript
//controller.js

    getDetails: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    try {
        const { login_id : id } = session.user
        const data = await db.getUserDetails({id})
        res.status(200).send(data[0])
    } catch(err){
        res.sendStatus(500)
    }
    }
```
```javascript
//index.js
app.get('/auth/details', ctrl.getDetails)
```

```sql
--getUserDetails.sql

select firstname, lastname, email, balance 
from users
join balances
on users.user_id = balances.balances_id
where users.user_id = ${id}; 
--CRUCIAL that we have the same id across all three tables, so everything refers to the same person/account
--
```
13. Create the logout
    - Write the controller function in controller.js
    - Add an endpoint in index.js of server
```javascript
//controller.js

    logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
    }
```
```javascript
//index.js
app.get('/auth/logout', ctrl.logout)
```


# Front End

1. File structure:
    - create `router.js` inside of `src`
    - create `redux` folder inside of `src`
        - `reducer.js`
        - `store.js`
    - create `Components` folder inside of `src`

```javascript
//store.js
import { createStore} from 'redux'
import reducer from './reducer'

export default createStore(reducer)
```

```javascript
//reducer.js
const initialState = {
    user_id: null,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    balance: null,
    authenticated: false
}

const UPDATE_USER_ID = 'UPDATE_USER_ID'
const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'

export function updateUserId(id){
    return {
        type: UPDATE_USER_ID,
        payload: id
    }
}

export function updateUsername(username){
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updateUserDetails(obj){
    return {
        type: UPDATE_USER_DETAILS,
        payload: obj
    }
}

// action - this is just one of the three functions from above
export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case UPDATE_USER_ID:
            return {...state, user_id: payload}
        case UPDATE_USERNAME:
            return {...state, username: payload}
        case UPDATE_USER_DETAILS:
            const { firstname, lastname, balance, email } = payload
            return {...state, firstname, lastname, balance, email} //this is shorthand - we could write firstname: firstname, lastname: lastname, etc
        default:
            return state
    }
}
```

2. Import provider, hashrouter, router, and store.js to App.js
    - wrap your return in Provider tags and pass your store as props
    - depending on your needs, either Hashrouter or Provider will be the outermost wrapper
```javascript
// App.js
import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import { HashRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import router from './router'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navbar/>
        {router}
      </HashRouter>
    </Provider>
  );
}

export default App;

```

3. Create a component:

```javascript
//Navbar.jsx
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Navbar = () => (
    <nav>
        <span>the bank</span>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
        {username && <div> Welcome, {username}</div>}
    </nav>
)

const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps)(Navbar)
```

4. Use the new component in App.js
5. Create a Home component
```javascript
//Home.jsx
import React from 'react'

const Home = () => (
   <h1> Home </h1>
)

export default Home
```
6. Create Login Component
```javascript
// Login.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'

class Login extends Component {
    componentDidMount(){
        if(this.props.username){
            this.props.history.push('/info')
        }
    }
    
    render(){
        return(
            <div>{this.props.children}</div>
        )
        }
}

const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return username
}

export default connect(mapStateToProps)(withRouter(Login))
```


