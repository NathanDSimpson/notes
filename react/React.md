# React - for creating user interfaces
----- 
[documentation](https://reactjs.org/docs/getting-started.html)

__React__  embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display. Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called “components” that contain both `html` and `javascript`.
React needs a __package manager__ to run: 
    - `npm` or `yarn`

## React vs Angular 2:
- __Angular 2__ creates single page applications (SPA's - server only sends one view)
    - includes a router, supports form validation
    - here to complete the whole user experience
        - control navigation between pages

- __React__ creates a user interface (UI) with dynamic views
    - You create different views (and parts of views) as components
    - You can use React as an SPA, but need to import other dependencies to do so 

## How does React render to the DOM?
React has a virtual DOM.
- This is basically a javascript copy of the DOM
    - javascript is faster than hmtl?
    - the virtual DOM compares changes and updates only whats needed, then sends this as to replace the real DOM
- Benefit: We only re-render the components with updates (state)


# Passing props
__Prop Types__ - Validate props by specifying prop type to react in the child component.
```javascript
//inside the component receiving the props
ComponentName.propTypes = {
    anyArray: React.PropTypes.array,
    name: React.PropTypes.string,
    age: React.PropTypes.number,
    user: React.PropTypes.object
}
```
```javascript
//parent component
render(){
    let anyArray = ['a', 'b', 'c', 'd', 'e']

    myFunction = () => {
        let x = 0
        return x
    }
    return(
        <div>
            <Home myFunction={this.myFunction}/>
            <ChildComponent anyArray={anyArray}>
        </div>
    )
}
```
```jsx
//child component
render(){
    return(
        <div>
                                                               {this.props.anyArray} 
        </div>
    )
}
```

# Using .map() to render arrays
Each item rendered needs a __unique key__.
```javascript
render(){
    return(
        <div>
            <ul>
                {this.props.anyArray.map((item, index) => <li key={index}> {item} </li>}
            <u/l>
        </div>
    )
}
```

# State
__setState()__ triggers a re-rendering of the component.
```javascript
setState({
    name: 'nate',
    age: 27
})
```

# State-less Components
If a component does not use state, we can create it as a functional component, which is more efficient.
- A stateless component can still have props.

Instead of this:
```javascript
import React from "react";

export class Header extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav">
                            <li><a href="#">Home</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
```

We have this:
```javascript
import React from "react";

//We pass props
export Header = (props) => {
    render() {
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav">
                            //props are an argument, so we don't have to use this.props
                            <li><a href="#">{ props.homeLink} </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
```

# Communicated between child and parent components.
We pass `parent` -> `child` via props.

We also pass `child` -> `parent` via props, but it's more complicated.
 - We pass functions as props to child components.

     - The child passes the arguments, but the function is executed in the parent component.

# Component Lifecycles

__When do they run?__
 1. `componentWillMount()` -  immediately before rendering.
    - If we have a new state we can pass it here so we only render once.
    -  Changing state does not trigger this.
 2. `componentDidMount()` - immediately after rendering.
 3. `componentWillReceiveProps()` - when a component receives new props.
 4. `shouldComponentUpdate()` - before rendering, but after receiving new props or state.
    - return `false` to prevent re-rendering
 5. `componentWillUpdate()` - before rendering, but after receiving new props or state.
    - after `shouldComponentUpdate()` returns `true` (or doesn't return `false`).
 6. `componentDidUpdate()` - After components updates are flushed to the (real) DOM.
 7. `componentWillUnmount()` - Immediately before removing the component from the DOM.
    - This happens through routing, and also other ways

```javascript
    componentWillMount() {
        console.log("Component will mount");
    }

    componentDidMount() {
        console.log("Component did mount!");
    }

    componentWillReceiveProps(nextProps) {
        console.log("Component will receive props", nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should Component update", nextProps, nextState);
        // if (nextState.status === 1) {
        //     return false;
        // }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Component will update", nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Component did update", prevProps, prevState);
    }

    componentWillUnmount() {
        console.log("Component will unmount");
    }
```

# Routing in React

terminal: `npm i react-router`

Set up the router in the root component (`App.js`, or `index.js `depending on naming conventions).
- You can also set up the router / routes in a config file, but we are not doing that here.

This example (from academind on youtube) uses a webpack server:
- We need to set up some config stuff in the package.json file so the server can handle our urls/routes.
    - add `--history-api-fallback` to the end of the `"build"` line.
``` 
//package.json
 "scripts": {
    "start": "npm run build",
    "build": "webpack -d && cp src/index.html dist/index.html && webpack-dev-server
             --content-base src/ --inline --hot --history-api-fallback",
    "build:prod": "webpack -p && cp src/index.html dist/index.html"json
```

```jsx
//App.js

// browserHistory allows us to use `/` instead of `#` in our urls. 
// This indicate what part of the url is dealt with by javascript and not the server.
import {Router, Route, browserHistory, IndexRoute} from "react-router";

class App extends React.Component {
    render() {
        return (
            // browserHistory tells the browser to stay inside the app. 
            // When we click a link, it does not reach out to the server.
            // Root allows us to use nesting: the nested route's path is appended to Root's route.
            // IndexRoute is what loads if there is nothing after the `/` in the url
            <Router history={browserHistory}>
                <Route path={"/"} component={Root} >
                    <IndexRoute component={Home} />
                    <Route path={"user/:id"} component={User} />
                    <Route path={"home"} component={Home} />
                </Route>
                <Route path={"home-single"} component={Home}/>
            </Router>
        );
    }
}
```

# Navigating with links and parameters in React

### Navigating through links:

```javascript
import {Link} from "react-router";

// activeStyle applies the styling when the user is on that link.
// activeClassName temporarily applies this class name when the user is on that link.
// activeClassName makes conditional styling very easy.
export const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><Link to={"/home"} activeStyle={{color: "red"}}>Home</Link></li>
                        <li><Link to={"/user/10"} activeClassName={"active"}>User</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
```

### Navigating via code:

Create an onClick listener that calls a navigation function.
- the function should send the new path to browserHistory.
- browserHistory is an array, so we just .push the new path

```javascript
import React from "react";
import { browserHistory } from "react-router";

export class User extends React.Component {
    onNavigateHome() {
        browserHistory.push("/home");
    }

    render() {
        return (
            <div>
                <h3>The User Page</h3>
                <p>User ID: {this.props.params.id}</p>
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>
        );
    }
}
```

### Using Parameters

```javascript
<Route path={"user/:id"} component={User} />
```

To make this ^^^ dynamic, we would need to use a variable in our path:

```javascript
<Route path={`user/:${id}`} component={User} />
```


```javascript
import React from "react";
import { browserHistory } from "react-router";

export class User extends React.Component {
    onNavigateHome() {
        browserHistory.push("/home");
    }

    // in <p>, we dynamically pull the user ID from the url via `this.props.params.id
    render() {
        return (
            <div>
                <h3>The User Page</h3>
                <p>User ID: {this.props.params.id}</p>
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>
        );
    }
}
```




