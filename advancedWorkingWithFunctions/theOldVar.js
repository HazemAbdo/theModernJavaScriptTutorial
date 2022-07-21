//NOTE “var” has no block scope it has function-scoped or global-scoped.
if (true) {
  var test = true; // it is global scope
}
//-------------
console.log(test); // true, the variable lives after if
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}
console.log(i); // 10, "i" is visible after loop, it's a global variable
console.log(one); // 1, "one" is visible after loop, it's a global variable
//---------------
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  console.log(phrase); // works
}
sayHi();
// console.log(phrase); // ReferenceError: phrase is not defined it is function scoped
//-------------------------------------
// “var” tolerates re-declarations
var user = "kak1";
var user = "kak2";
console.log(user); //kak2
//-------------------------------------
//"var” variables can be declared below their use
//var variables are defined from the beginning of the function, no matter where the definition is
//People also call such behavior hoisting (raising),
//because all var are “hoisted” (raised) to the top of the function.
function sayHi2() {
  phrase = "Hello kak";
  console.log(phrase); //hello kak
  var phrase;
}
sayHi2();
//----------
//Declarations are hoisted, but assignments are not.
function sayHi3() {
  console.log(phrase); //undefined
  var phrase = "Hello";
  //it is equivalent to
  //   var phrase;
  //   console.log(phrase);
  //   phrase = "Hello";
}

sayHi3();
//-------------------------------------
//NOTE IIFE “immediately-invoked function expressions”
// In the past, as there was only var, and it has no block-level visibility,
//programmers invented a way to emulate it.
//Here,a Function Expression is created and immediately called. So the code
//executes right away and has its own private variables.
(function () {
  console.log("Parentheses around the function");
})();

(function () {
  console.log("Parentheses around the whole thing");
})();

!(function () {
  console.log("Bitwise NOT operator starts the expression");
})();

+(function () {
  console.log("Unary plus starts the expression");
})();
