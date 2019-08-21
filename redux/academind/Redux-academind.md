# Redux (and only redux)
-------------

Redux keeps track of state outside of our components in a 'store'
- This makes the state accessible by all components.

# Creating a `store`
Terminal: `npm install redux`

Import `createStore` to your javascript file.
- `createStore()` takes several  arguments.
    - `reducer`: This comes first. It is a function that tells the store how to deal with dispatches.
    - `initialState`: The starting point of our state. Can omit this if provided in the reducer.
    -  `middleware`: This comes last, runs some code before creating or updating the store.
```javascript
import { createStore } from `redux`

const store = createStore(reducer, initialState, middleware) // all arguments undefined 
```


`createStore()` can only take one reducer and store one state. 
- `combineReducers()` allows us to have multiple reducers, and consequently, sub-states to keep things organized.
```javascript
import { createStore, combineReducers } from `redux`

// all arguments still undefined
const store = createStore(combineReducers({reducer_1, reducer_2}), initialState, middleware)) 
```

`applyMiddleware()` - allows us to execute code prior to store updating (or creation).
- We use `applyMiddleware()` as an argument for `createStore()`.
    - We pass the functions we want to execute before the store is created or updated into `applyMiddleware()`
- A common middleware is `logger()`
    - `logger()` nicely displays `oldState`, `action`, and `newState` in the console.

```javascript
import { createStore, applyMiddleware} from `redux`
import logger from 'redux-logger'


const store = createStore(reducer, initialState, applyMiddleware(logger())) 
```

We can omit `initalState` from create store if we provide initial state in the `reducer`.
```javascript
import { createStore } from `redux`

const store = createStore(reducer, {} ) //we still pass an empty object
```

`Reducers` are used by the `store` to deal with dispatches from a `component`. Reducers take two arguments and return a new state object to the store.
- Argument: `state` - provided by the store. Used to create a copy that will then be modified and returned.
- Argument: `action` - provided by the dispatch even. Contains `.type` and `.payload` properties.
- Returns: A NEW state object to the store

```javascript
import { createStore } from `redux`

const initialState = {//for our reducer to use before there is a state object in the store
    result: 1,
    lastValues: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case `ADD`:
            let newState = {
                ...state, //grab a copy of state
                result: state.result + action.payload, //update the relevant properties
                lastValues: [...state.lastValues, state.result] //keep track of the previous states
                }
            newState.lastValues.push(state.result) 
            break
        case `SUBTRACT`://this does nothing right now
            break
    }
    return newState
}

const store = createStore(reducer, {}) //one reducer, no middleware, and initialState handled by the reducer
```

# Communicating with the `store`

`store.subscribe()` gives components access to state.
- Whenever the store updates, the callback function is invoked.
    - `store.getState()` grabs the updated state object.

```javascript
store.subscribe( () => {
    console.log(`Store updated.`, store.getState())
})
```

`store.dispatch()` lets components update state.
- sends an object with the attributes to be changed, as well as those new values.

```javascript
store.dispatch(
    {
        type: "ADD",
        payload: 1 
    }
)
```

# Connecting Redux and React

Terminal: `npm i react-redux`

### `<Provider>` - gives our components access to the redux store.
- Wrap our outermost component in a `<Provider>` element and send the store as props.
```javascript
// App.js (or whatever the most-parent component is)
import { Provider } from 'react-redux`
import store from './store'

return(){
    render(
        <Provider store={store}>
            <App>
        </Provider>
    )
}
```
## Inside of a `Component`:

### `mapStateToProps()` - map the global application state to the properties of a component.
- Which properties of global app state are needed for this components?
- Which local properties in this component should the global state props be mapped to?
- `argument`: supply `mapStateToProps` with an `arrow function` with `state` as the argument.
- `return`: a javascript object with.
    - Keys: the property names as referenced in the component
        - One key for each reducer.
    - Values: the reducer that manages that aspect of state
### `mapDispatchToProps()` - 
- Which actions should be dispatched from each component?

### `connect()` - Connects a component to the redux store
- executes `mapStateToProps` so that the component is connected to the redux store




```javascript
// App.js (or whatever the most-parent component is)
import { Provider , connect } from 'react-redux'
import store from './store'


 //our userReducer must return an object with a `userName` key for this to work
return(){
    render(
        <div>
            <User> 
            Name: {this.props.user.userName} //use the global state
            <Button onClick={this.props.setUserName('Nate')}>  //dispatch
                Change your name to Nate!
            </Button>
            </User>
        </div>
    )
}

const mapStateToProps =  (state) => {
    return {
        // one key-value pair for each reducer / sub-state
        user: state.userReducer
    }
}

const mapDispatchToProps =  (dispatch) => {
    return {
        setUserName: (name) => {
            setUserName({
                type: 'SET_USER_NAME',
                payload: name
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
```

# Project Structure

## Containers vs Presentation Components
__Containers__ are components that use global state via the redux store.

__Presentation components__ are state-less components, not hooked up to the redux store.

Convention is to have separate directories for these:
- `container` for containers
- `componenets` for state-less components

https://www.youtube.com/watch?v=YmGm-qwbJdc&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&index=9
- this video ties everything together

# Handling asynchronous actions
Key moments in time
- When the call to the API is sent
- When a response is returned

Both of these moments need a change in application state via dispatched actions to the reducers.
- __Request began__
    - The reducers may handle this action by toggling an isFetching flag in the state. This way the UI knows it's time to show a spinner.
- __Request Finished successfully__.
    - The reducers may handle this action by merging the new data into the state they manage and resetting isFetching. The UI would hide the spinner, and display the fetched data.
- __Request failed__
    - The reducers may handle this action by resetting isFetching. Additionally, some reducers may want to store the error message so the UI can display it.

```javascript
///the action objects passed to the reducer
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```
