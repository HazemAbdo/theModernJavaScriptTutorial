"use strict";
//--------------------------------------------------
//* obj instanceof Class
// It returns true if obj belongs to the Class or a //! class inheriting from it.
//obj.__proto__ === Class.prototype?
//obj.__proto__.__proto__ === Class.prototype?
//obj.__proto__.__proto__.__proto__ === Class.prototype?
//...
// if any answer is true, return true
// otherwise, if we reached the end of the chain, return false
//obj instanceof Class can be rephrased as //* Class.prototype.isPrototypeOf(obj)
//--------------------------------------------------------------------
//Normally, instanceof examines the prototype chain for the check. We can also set a custom
//logic in the static method //* Symbol.hasInstance
class Animal {
  static [Symbol.hasInstance](obj) {
    return obj.canEat === true;
  }
}
let obj = { canEat: true };
console.log(obj instanceof Animal); //true
//--------------------------------------------------------------------
//* toString
// actually much more powerful than that. We can use it as an extended typeof and an alternative for instanceof
let s = Object.prototype.toString;
console.log(s.call(1)); //[object Number]
console.log(s.call(true)); //[object Boolean]
console.log(s.call([])); //[object Array]
console.log(s.call({})); //[object Object]
console.log(s.call(console.log)); //[object Function]
//-------------------
let user = {
  [Symbol.toStringTag]: "User",
};
console.log({}.toString.call(user)); //[object User]
//At the end we have “typeof on steroids” that not only works for primitive data types,
//but also for //* built-in objects and even can be customized.
//--------------------------------------------------------------------
// It’s funny, but the Class constructor itself does not participate in the check!
// Only the chain of prototypes and Class.prototype matters
function Rabbit() {}
let rabbit = new Rabbit();
// changed the prototype
Rabbit.prototype = {};
// ...not a rabbit any more!
console.log(rabbit instanceof Rabbit); //! false
//------------------------------------------------TASKS-------------------------------------------------------
//? In the code below, why does instanceof return true? We can easily see that a is not created by B()
//as the constructor doesn't matter but what matters is the prototype and A&&B have the same prototype
function A() {}
function B() {}
A.prototype = B.prototype = {};
let a = new A();
console.log(a instanceof B); // true
