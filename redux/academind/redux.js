
// createStore is a function that comes with the redux package
// createStore takes only one reducer and stores one state
// combineReducers allows us to have multiple reducers, and consequently, sub-states to keep things organized
// applyMiddleware is passed into createStore and allows us to run some code before creating the store
import { createStore , combineReducers, applyMiddleware} from `redux`

const initialState = {
    result: 1,
    lastValues: []
}

// the reducer returns a new state object to the store
// argument: state - comes from store
// argument: action - an object from the dispatch event with .type and .payload properties
const reducer = (state = initialState, action) => {
    switch(action.type){
        case `ADD`:
            let newState = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, state.result]
                }
            newState.lastValues.push(state.result) 
            break
        case `SUBTRACT`:
            break
    }
    return newState
}

// argument: reducer - so the store knows how to handle dispatches
// argument: initialState - to provide the structure initial value of state
const store = createStore(reducer, initialState) 
// if we use initialState as a default argument for the reducer, we can omit it here
// if we have multiple reducers, we can combine them using combineReducer
const store = createStore(combineReducers({reducer_1, reducer_2})) 
// to use middleware, we add applyMiddleware() as an argument and and pass in our middleware function, but do not invoke it
const store = createStore(combineReducers({reducer_1, reducer_2}), applyMiddleware( MIDDLEWARE_FUNCTION )) 




// whenever the store updates, the callback is invoked
// this is where we integrate react to conditionally render components
store.subscribe( () => {
    // store.getState() is built into redux to grab the current value of state
    console.log(`Store updated.`, store.getState())
})


store.dispatch(
    {
        type: "ADD",
        payload: 1 
    }
)
