Node 
----
[documentation](https://nodejs.org/dist/latest/docs/api/)

__Node (npm)__  allows developers to write JavaScript code that runs directly in a computer process itself instead of in a browser. Node can, therefore, be used to write server-side applications with access to the operating system, file system, and everything else required to build fully-functional applications. 

- Node is built to handle asynchronous JavaScript code, like reading and writing to the file system, handling connections to database servers, and handling requests as a web server.
- Node functions and methods that facilitate asynchronous activity take a callback function. This will be called once the asynchronous operation has resolved. By convention, the first argument of this callback is an error placeholder. If an error occurred in the asynchronous operation (like trying to read a non-existent file), the error argument will be an Error object, but it will be null if no error occurs. 

```javascript
const fs = require('fs');

fs.readFile('./script.js', function(error, data) {
  // error is null if no error occurred, but an Error object if it did
  if (error) {
   throw error;
  }
  // the file data will be passed into the callback if no error was thrown
  console.log(data);
});
```


__Globals__



- `module` is an object referring to the functionality that will be exported from a file. In Node, each file is treated as a module.
- `require()` is a function used to import modules from other files or Node packages.
- `process` is an object referencing to the actual computer process running a Node program and allows for access to command-line arguments and much more.