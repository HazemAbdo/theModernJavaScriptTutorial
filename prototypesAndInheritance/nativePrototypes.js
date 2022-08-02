//“everything inherits from objects”
//------------
//closer in the chain is used
let obj = {};
console.log(obj);
// [[Prototype]]: Object
// constructor: ƒ Object()
// .....
console.log(obj.__proto__ === Object.prototype); //true
console.log(obj.__proto__.__proto__); //null
let arr = [1, 2, 3];
console.log(arr);
// Array(3)
// 0: 1
// 1: 2
// 2: 2
// length: 3
// [[Prototype]]: Array(0)
// ....
console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__ === Object.prototype); //true
console.log(arr.__proto__.__proto__.__proto__); //null
function f() {}
console.log(f.__proto__ == Function.prototype); // true
console.log(f.__proto__.__proto__ == Object.prototype); // true
//------------
//primitives-->//*temporary wrapper objects are created using built-in constructors
// String,Number and Boolean.They provide the methods and disappear
//------------
//Special values null and undefined stand apart. They have //*no object wrappers
// , so methods and properties are not available for them.And there are no corresponding prototypes either.
//------------
//So, generally, modifying a native prototype is considered a //!bad idea.
//there is only one case where modifying native prototypes is approved.That’s //*polyfilling.
String.prototype.show = function () {
  console.log(this);
};
"BOOM!".show(); // BOOM!
//-------------
// Borrowing from prototypes
let obj2 = {
  0: "Hello",
  1: "world!",
  length: 2,
};
//It works because the internal algorithm of the built-in join method only cares about the correct
//indexes and the length property.It doesn’t check if the object is indeed an array. Many built-in methods are like that.
obj2.join = Array.prototype.join; //*here we borrow join for Array.prototype
console.log(obj2.join(",")); // Hello,world!
//we can borrow all Array methods
obj2.__proto__ = Array.prototype;
obj2 = obj2.slice(1);
console.log(obj2); // world!,!
//----------------------------------------------------------TASKS------------------------------------------------------
Function.prototype.defer = function (ms) {
  setTimeout(this, ms);
};
function f() {
  console.log("Hello!");
}
f.defer(1000); // shows "Hello!" after 1 second

//-------------------------------------------
Function.prototype.defer2 = function (ms) {
  let self = this;
  return function (...args) {
    setTimeout(() => self.apply(this, args), ms);
  };
};
function f(a, b) {
  console.log(a + b);
}

f.defer2(1000)(1, 2); // shows 3 after 1 second
