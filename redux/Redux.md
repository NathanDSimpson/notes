# REDUX

__React Redux__ : official react binding tool for working with  Redux in React applications

__Combine Reducers__ : multiple reducers in a redux store for better organization 

__Promise Middleware__ : manage AJAX (Asynchronous Javascript And XML) requests


 // component -> import from react-redux // importing in store.js or reducer.js, import from redux

 1. Setup store in the project root
 2. Set up sample reducer (inside of ducks) and initial state in and import it into your store
 3. Wrap your application in the provider tags
 4. Pull in middleware and apply them in your store.js


 Provider: makes the store globally available to react components
  - Access state by `connect()`, which takes two arguments:
    - 1: A function that maps state to props.
    - 2: An Object containing the action creaters (dispatch functions).
      - this is called the mapDispatchToProps


## Redux 2 : Using react-redux
### These instructions follow the class example from: https://github.com/NathanDSimpson/redux-2-afternoon

1. Inside of ```src```, create ```ducks``` directory. This is where reducer functions go.
   - Each ```reducer``` should have an initial state and export a reducer function:
   - This function should take two parameters: state (with default value of ```initialState```), and an action.
```javascript 
// reducer.js file - you will have several of these
const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
  }
  
  export default function reducer(state = initialState, action) {
    return state;
  }
```
2. Create ```store.js``` in the ```src``` directory. 
   - LOTS of imports
   - We are now ready to connect the redux and react sections of our app.
   - Middleware lets us use asychronous code in our action creators.


```javascript
// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './ducks/budgetReducer';
import userReducer from './ducks/userReducer';

// Middleware lets us use asychronous code in our action creators.

const rootReducer = combineReducers({
// combineReducer does just that. It brings our reducers (and states) into a single object.
// We pass this object via props in index.js, making it accessible by all components of our app
  budget: budgetReducer,
  user: userReducer // <- one of these for each reducer.js file
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
// create our store
//applyMiddleware() lets use use the middleware `promiseMiddleware`
```
3. Inside of ```./src/index.js``` import ```Provider``` and ```store.js```(the store you just made).
   - Wrap the ```<App>``` component in ```<Provider>```. 
      - This is the same thing we do with ```<Hashrouter>```. Depending on the app, Provider may wrap Hashrouter, or visa-versa.
   - Pass ```store``` to the Provider component as ```props``` .
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'

// Passing store as props allows it to be accessed in any component of our app
ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>
  
  , document.getElementById('root'));

serviceWorker.unregister();
// If you want your app to work offline and load faster, change unregister() to register(). 
// Note this comes with some pitfalls: http://bit.ly/CRA-PWA

```

4. Connect the front end (a react component's render) to the redux store (`store.js`)
   - Inside the `Component`: 
      - Import `connect` from `react-redux`
      - Create the function `mapStateToProps`.
      - Modify the export so that we are exporting `connect` invoked.
         - Pass your `mapStateToProps` function as the argument.
         - `connect` returns a function. Invoke this with the `Component` as the argument.  
```javascript
// Budget.js (react component)
import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'


class Budget extends Component {

  render() {
// These props are passed from index.js, the source is store.js
// These props are available in any component of our app
// store.js imports all of our reducers, storing all of their states in one place
// We use the loading property to toggle between views
    const { loading } = this.props.budget; // this isn't this.props.store.budget. because we already tied "budget" to store.budget in mapStateToProps
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase />
              <DisplayPurchases />
            </div>
            <div className='chart-container'>
              <Chart1 />
              <Chart2 />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(store) {
  return {
    budget: store.budget
  }
}

export default connect(mapStateToProps)(Budget);
// connect will always use store.js as the argument for the callback (which is mapStateToProps). 
//store.js comes from <Provider> as props
```

5. Get data from the server, store it in the redux store, display some of this data.
