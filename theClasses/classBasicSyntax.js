"use strict";
//In object-oriented programming, a class is an extensible program-code-template
//for creating objects, providing initial values for state (member variables)
//and implementations of behavior (member functions or methods).
//-------------------------------------------------------------
//What class MyClass {...} construct really does is:
//1-Creates a function named MyClass, that becomes the result of the class declaration.
// The function code is taken from the constructor method (assumed empty if we don’t write such method).
//2-Stores class ((methods)) in //* MyClass.prototype.
// MyClass === MyClass.prototype.constructor-->true
//-----------
// !Class not just a syntactic sugar
//1-class is labelled by a special internal property //* [[IsClassConstructor]]: true
//The language checks for that property in a variety of places. For example, unlike a regular function,
//it must be called with new
//2-Class methods are //* non-enumerable.
//3-Classes always //* use strict
//--------
//! If a class expression has a name, it’s visible inside the class only:
// let User = class MyClass {
// };
// console.log(MyClass);//ReferenceError: MyClass is not defined
//---------
// class MyClass { //a class is a kind of //* function
//   // The important difference of class fields is that they are //*set on individual objects, not User.prototype
//   prop = value; // property //class fields
//   constructor(...) { // constructor() method is called automatically by new
//     // ...
//   }

//   method(...) {}    // method
//   method=()=>{}    //Bind the method to object //*the value of this will always be correct.
//   get something(...) {}   // getter method
//   set something(...) {}   // setter method

//   [Symbol.iterator]() {}   // method with computed name (symbol here)
//   // ...
// }
//-------------------------------------------------------------
class Button {
  constructor(value) {
    this.value = value;
  }
  //The class field click = () => {...} is created on a per-object basis,
  //there’s a separate function for each Button object, with this inside it referencing that object.
  //We can pass button.click around anywhere, and //* the value of this will always be correct.
  //That’s especially useful in browser environment, for event listeners.
  click = () => {
    console.log(this.value);
  };
}
let button = new Button("hello");
let button1 = new Button("world");
console.log(button);
console.log(button1);
setTimeout(button.click, 1000);
//-----------------------------------------------------TASKS------------------------------------------------
//? Rewrite it in the “class” syntax
// function Clock({ template }) {
//   let timer;
//   function render() {
//     let date = new Date();
//     let hours = date.getHours();
//     if (hours < 10) hours = "0" + hours;
//     let mins = date.getMinutes();
//     if (mins < 10) mins = "0" + mins;
//     let secs = date.getSeconds();
//     if (secs < 10) secs = "0" + secs;
//     let output = template
//       .replace("h", hours)
//       .replace("m", mins)
//       .replace("s", secs);
//     console.log(output);
//   }
//   this.stop = function () {
//     clearInterval(timer);
//   };
//   this.start = function () {
//     render();
//     timer = setInterval(render, 1000);
//   };
// }
// let clock = new Clock({ template: "h:m:s" });
// clock.start();
//---------------------------------------------------
class Clock {
  timer = 0;
  constructor({ template }) {
    this.template = template;
  }
  render = () => {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;
    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);
    console.log(output);
  };
  stop = () => {
    clearInterval(this.timer);
  };
  start = () => {
    this.render();
    this.timer = setInterval(this.render, 1000);
  };
}
let clock = new Clock({ template: "h:m:s" });
clock.start();
