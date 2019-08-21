```javascript
// router.js - in app root directory
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Forms/Login'
import LoginForm from './Components/Forms/LoginForm'
import RegisterForm from './Components/Forms/RegisterForm'
import Details from './Components/Details'

export default (
	<Switch>
        <Route 
            exact path='/' 
            component={Home} />
        <Route 
            path='/login' 
            component={() => (
                <Log
                    <LoginForm />
                    <RegisterForm />
                </Login>
			    )}  />
        <Route 
            path='/info' 
            component={Details} />
	</Switch>
)
```
```javascript
// App.js
import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter} from 'react-router-dom'
import Navbar from './Components/Navbar'
import router from './router'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        {router}
      </HashRouter>
    </Provider>
  );
}

export default App;
```

```javascript
//A component using routing
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Login extends Component {
	componentDidMount() {
		if (this.props.username) {
			this.props.history.push('/info')
		}
	}

	render() {
		return <div>{this.props.children}</div>
	}
}

const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps)(withRouter(Login))
```