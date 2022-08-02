"use strict";
//Setting or reading the prototype with obj.__proto__ is considered outdated and somewhat deprecated
//(moved to the so-called “Annex B” of the JavaScript standard, meant for browsers only)
// The modern methods to get/set a prototype are:
let animal = {
  eats: true,
};
// Object.create(proto, [descriptors])
// create a new object with animal as a prototype
let rabbit = Object.create(animal);
console.log(Object.getPrototypeOf(rabbit) === animal); //true
Object.setPrototypeOf(rabbit, {});
console.log(Object.getPrototypeOf(rabbit)); //{}
let rabbit2 = Object.create(animal, {
  jumps: {
    value: "jumps",
  },
});
console.log(Object.getPrototypeOf(rabbit2) === animal); //true
console.log(rabbit2.jumps); //jumps
//-----------------------------------------------------
//This call makes a truly exact copy of obj, including all properties: enumerable and non-enumerable,
//data properties and setters/getters – everything, and //*with the right [[Prototype]]
let exactlyRabbit2 = Object.create(
  Object.getPrototypeOf(rabbit2),
  Object.getOwnPropertyDescriptors(rabbit2)
);
console.log(
  Object.getPrototypeOf(exactlyRabbit2) === Object.getPrototypeOf(rabbit2) //true
);
console.log(exactlyRabbit2.jumps); //jumps
//-----------------------------------------------------
//The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.
//1-The prototype property of a constructor it’s the oldest way to create objects with a given prototype.
//2- Object.create appeared in the standard. It gave the ability to create objects with a given prototype,
//but did not provide the ability to get/set it.
//3-Some browsers implemented the non-standard __proto__ accessor that allowed the user
//to get/set a prototype at any time, to give more flexibility to developers.
//4-Object.setPrototypeOf and Object.getPrototypeOf were added to the standard, to perform the same functionality as __proto__
//5- it was officially allowed to use __proto__ in object literals {...} (moved out of Annex B),
//but not as a getter/setter obj.__proto__ (still in Annex B).
//-----------------------------------------------------
//why __proto__ is bad?
// we can see an interesting glitch: //!all keys work fine except "__proto__".
let obj2 = {};
let key3 = "anyThingExceptProto";
let key2 = "__proto__";
obj2[key2] = "some value";
obj2[key3] = "some value";
// __proto__ property is special: it must be either an object or null so string is ignored
//if we store objects it will work but this means that the //!prototype had been changed
console.log("__proto__", obj2[key2]); //!no thing appears
console.log("anyThingExceptProto", obj2[key3]); //some value
//-----------------------------------------------------
//to avoid the above problem we can use map instead of object as a dictionary
let map1 = new Map();
let key1 = "__proto__";
map1.set(key1, "some value");
console.log(map1.get(key1)); //* "some value" (as intended)
//-----------------------------------------------------
//Now, if we intend to use an object as an associative array and be free of such problems,
//we can do it with a little trick:
//as --proto-- is inside the prototype (prototype accessors) then we make
//an empty object without a prototype ([[Prototype]] is null) then their is no __proto__
let obj = Object.create(null);
// or: obj = { __proto__: null }
let key = "__proto__";
obj[key] = "some value";
console.log(obj[key]); //* "some value"
//-----------------------------------------------------
//We can call such objects //* “very plain” or “pure dictionary” objects,
//because they are even simpler than the regular plain object {...}
// A downside is that such objects //! lack any built-in object methods, e.g. toString
let obj3 = Object.create(null);
console.log("very plain object try to use toString", obj3); // Error (no toString)
//-----------------------------------------------------
//But that’s usually fine for associative arrays.
//Note that most object-related methods are Object.something(...), like Object.keys(obj)
//– they are not in the prototype, so they will keep working on such objects:
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";
console.log(Object.values(chineseDictionary)); // ['你好', '再见']
//-----------------------------------------------------Tasks------------------------------------------------
//There’s an object dictionary, created as Object.create(null), to store any key/value pairs.
//?Add method dictionary.toString() into it, that should return a comma-delimited list of keys.
//Your toString should not show up in for..in over the object.
//this works only on the browser
// let dictionary = Object.create(null, {
//   toString: {
// define toString property
//     value() {
// the value is a function
//       return Object.keys(this).join();
//     },
//   },
// });
// dictionary.apple = "Apple";
// dictionary.__proto__ = "test";
// apple and __proto__ is in the loop
// for (let key in dictionary) {
//   alert(key); // "apple", then "__proto__"
// }
// comma-separated list of properties by toString
// alert(dictionary); // "apple,__proto__"
//-----------------------------------------------------
function Rabbit3(name) {
  this.name = name;
}
Rabbit3.prototype.sayHi = function () {
  console.log(this.name);
};
console.log(Rabbit3.prototype);
//? These calls do the same thing or not?
let rabbit3 = new Rabbit3("Rabbit3");
// this==>rabbit3==>name:Rabbit3
rabbit3.sayHi(); //? Rabbit3
// this==>Rabbit3.prototype==>name:undefined
Rabbit3.prototype.sayHi(); //? undefined
// this==>Rabbit3.prototype==>name:undefined
Object.getPrototypeOf(rabbit3).sayHi(); //? undefined
// this==>Rabbit3.prototype==>name:undefined
rabbit3.__proto__.sayHi(); //? undefined
