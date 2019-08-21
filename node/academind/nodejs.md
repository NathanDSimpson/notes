# node.js
Node is a runtime that allows us to run javascript code on the server (its usually run on the browser).

- Other options: 
    - `Ruby` 
    - `php`
    - `asp.net`

What is good about Node.js
- Its' __Javascript__. The front end and back end use the same language. You don't have to use `php` as well as javascript.
- It's __event-driven__ and __Non-blocking__. 
- It uses __one thread__, but is __asynchronous by nature__ - fast. 
- Good at __handling lots of clients and requests__ at the same time (thousands)
- We write __our own server__. Lets us see stuff in the browser much more quickly.
    - in php you do not write your own server. There: `apache`, `php`.

What it bad about Node.js
- Handling one single data-intensive request

## High-level understanding of Node.js
Node.js listens on a certain port on a certain domain and dictates how incoming requests are handled. 
- `server.js`: this is the file that Node.js will execute


# Create a simple app
1. command line: `node -v` to see what version you have.
2. create a folder with server.js inside
    - terminal: `node server.js` and then go to `http://localhost:8000/` in the browser.
```javascript
//server.js

//http is a core module of Node.js, so we do not have to provide a path
const http = require('http');

function onRequest(req, res){
    res.writeHead(200, {'Content-Type': `text/plain`});
    res.write(`hello world`);
    res.end();
}
http.createServer(onRequest).listen(8000);
```

# Render html
- to start - terminal: `node server.js`
1. `server.js`
```javascript
var http = require('http');
var fs = require('fs');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'}); //specify what type of data we are sending
    fs.readFile('./index.html', null, function(error, data) { //read the html file. data is the file contents
        if (error) { //check for error
            response.writeHead(404); // send error response code
            response.write('File not found!');
        } else {
            response.write(data); // if no error, send the html
        }
        response.end(); // must be inside the callback function, 
                        // otherwise we might end the response before we get the 'data'
    });
}

http.createServer(onRequest).listen(8000);
```
2. `index.html`
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My File</title>
</head>
<body>
    <h1>Now using HTML</h1>
</body>
</html>
```
# Routing
`App.js` exports functionality for `serer.js`

`server.js`
```javascript
var http = require('http');
var app = require('./app');

http.createServer(app.handleRequest).listen(8000);
```
`app.js`
```javascript
var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
  //callback for creating our server
  handleRequest: function(request, response) { 
      response.writeHead(200, {'Content-Type': 'text/html'});

      //grab the url (path)
      var path = url.parse(request.url).pathname;
      //render our html based of of the url
      switch (path) {
          case '/':
              renderHTML('./index.html', response);
              break;
          case '/login':
              renderHTML('./login.html', response);
              break;
          default:
              response.writeHead(404);
              response.write('Route not defined');
              response.end();
      }

  }
};
```


# Express

Express allows us to quickly set up routes and easily render.

Express uses a templating engine to dynamically injects values into html.

Install Express
- terminal:  `sudo npm i express -g express-generator`

Create an express app 
- terminal: `express NAME_OF_APP`
- `bin/wwww` is the server file that express created for us

Install `node_modules` hold all the dependencies needed for the project
- terminal: `npm i`

To start up the server:
- terminal: `npm start` OR `node bin/www`