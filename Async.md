# Axios and db (massive) requests are both Asynchronous
- what imports / libraries do we need to handle these?
    - I saw `thunk` referenced in the redux docs, as well as some others
    - We use `promise-middleware`, but isn't that just for our redux store?
        - Don't our `axios` and `db/massive` request also operate using promises?

### `try {} catch(err){}`
- please explain
- I see that it is commonly used in conjunction with async await and axios requests

### `async` - `await` vs `.then()`
 - what are the differences? 
 - do these rely on any external libraries?
 - does `.then()` also use `.catch`, or is `.catch()` only for use with `try{}.catch(err){}`


### `this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}`
- What is this again? I know its basically a ternary...

### `export default connect(null, mapDispatchToProps)(withRouter(LoginForm))`
- What is `withRouter()` doing?

### `Axios` docs

### `Hashrouter`


```javascript
handleSignUpFormSubmit = async (e) => {
    e.preventDefault()
    const { username, password, firstname, lastname, email } = this.state
    try {
        await axios.post('/auth/register', {
            username,
            password,
            firstname,
            lastname,
            email
        })
        this.props.updateUsername(username)
        this.props.history.push('/info')
    } catch (err) {
        this.setState({ registerError: true })
    }
}
```
```javascript
login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const {loginUsername : username} = req.body
try {
    let user = await db.login({username})
    session.user = user[0]
    const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password)
    if(authenticated){
        res.status(200).send({authenticated, user_id: user[0].login_id})
    } else {
        throw new Error(401) //Catch the error ourselves, this is better than the default below.
    }
} catch(err) {
    res.sendStatus(401)
    }
}
```