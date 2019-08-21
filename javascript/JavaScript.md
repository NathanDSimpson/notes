
__Closures, Module Patterns, Constructors, Object Factories, and Classes__
--------------------------------------------------------------------------

Closures 
--------
Functions that return functions. The inner function has access to private date from the parent scope. When the inner function is stored in a variable, it receives a COPY of the private data.

Called "closures" because the data of the parent scope is closed-off to the child (returned) function.

```javascript 
// Closure
function count(){
  let num = 0
  return function(){
    return ++num
  } 
}

const attendanceTracker = count();
attendanceTracker()
```

Module Pattern
--------------
Basically the same as closure, but instead of returning a function, you return an object consisting of functions. 
```Javascript
// Module Pattern
function count(){
  let num = 0
  return {
    add(){
      return ++num
    },
    peek(){
      return num
    }
  }
}

const attendanceTracker = count();
attendanceTracker.add()
attendanceTracker.peek()
```

Constructor Functions
---------------------
Also referred to as "factories." Create unique instances of data with the same structure. 

You can create methods that are accessible to all instances via the prototype method. This saves space by storing the function once, instead of storing it on each unique instance. 

___Make sure to include the 'new' keyword when creating a new instance.___ Without it, this new instance attaches to the window in global scope, which will likely break your program. 
```javascript
// Constructor Function
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.miles = 0;
}

// Without the "new" keyword, tesla would be created on the window with global scope....
const tesla = new Car('Tesla', 'Roadster', 2019);

// Prototype methods are accessible by all instances, but only stored in data once.
Car.prototype.drive = function() {
  return this.miles += 1;
}

tesla.drive();
```

Object Factory
--------------
A regular function (or constructor function) that creates object instances. The code below is a regular ole functin that returns an object. Our code from above is a constructor function that also is an Object Factory.

```javascript
//Object Factory
function carFactory(make, model, year) {
  return {
    make,
    model,
    year,
    miles: 0,
    // this drive method is created and stored on EVERY instance of car...
    drive() {
      return this.miles += 1;
    }
  }
}

const tesla = carFactory('Tesla', 'Roadster', 2019);
```

Classes
-------
Syntactic sugar for constructor functions. In addition to readability, classes make it much easier to create methods that are accessible by any instance of the class, but only stored in memory once.
```javascript
// Classes
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.miles = 0;
  }
  // this is a prototype method
  // all objects of this class have access, without having to store it in memory for each individual object
  drive() {
    return this.miles += 1;
  }
}

const tesla = new Car('Tesla', 'Roadster', 2019);
```