"use strict";
//property has special attributes called flags
//writable-->It is value can be changed
//enumerable-->we can iterate over it (listed in loops)
//configurable-->can be deleted and we can change its flags(attributes can be modified)
//---------------------------------------
//let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
let user = {
  name: "John",
};
let descriptor = JSON.stringify(Object.getOwnPropertyDescriptor(user, "name"));
// When we create a property the usual way, all of them are true. But we also can change them anytime.
console.log(descriptor); //{"value":"John","writable":true,"enumerable":true,"configurable":true}
//------------
//Object.defineProperty(obj, propertyName, descriptor)
let user2 = {};
Object.defineProperty(user2, "name", {
  writable: true,
  enumerable: true,
});
let descriptor2 = JSON.stringify(
  Object.getOwnPropertyDescriptor(user2, "name")
);
// if a flag is not supplied, it is assumed false.
console.log(descriptor2); //{"writable":true,"enumerable":true,"configurable":false}
//-------------------------------------------------------
Object.defineProperty(user, "name", {
  writable: false,
});
//Errors appear only in strict mode
//even in the non strict mode the value will not change but no errors
// user.name = "mark"; //Error:Cannot assign to read only property 'name'
//---------------------------------------------------------------------------
//Non-enumerable properties are also excluded from Object.keys like from for
let user3 = {
  name: "John",
  toString() {
    return this.name;
  },
};
// By default, both our properties are listed:
for (let key in user3) console.log(key); // name, toString
console.log(Object.keys(user3)); //(2) ['name', 'toString']

Object.defineProperty(user3, "toString", {
  enumerable: false,
});
for (let key in user3) console.log(key); // name
console.log(Object.keys(user3)); //["name"]
//---------------------------------------------------------------------------
//Making a property non-configurable is a one-way road.
//We cannot change it back with defineProperty
// A non-configurable property can’t be deleted, its attributes can’t be modified
let piDescriptor = Object.getOwnPropertyDescriptor(Math, "PI");
// forever sealed constant
//{
//   "value": 3.141592653589793,
//   "writable": false,
//   "enumerable": false,
//   ---->"configurable": false<---
// }
console.log(JSON.stringify(piDescriptor, null, 2));
// Math.PI = 3; //Uncaught TypeError TypeError: Cannot assign to read only property
//I really want to change it wawawawa
//Uncaught TypeError TypeError: Cannot redefine property: PI
// Object.defineProperty(Math, "PI", {
//   writable: true,
// });
//--------------
//if some property is writable then even make "configurable": false
// will not change that we still can change its value
//--------------
//NOTE the only exception is We can change writable: true to false for a non-configurable property
//---------------------------------------------------------------------------
// Object.defineProperties(obj, {
//   prop1: descriptor1,
//   prop2: descriptor2
//   // ...
// });
//---------------------------------------------------------------------------
// Object.getOwnPropertyDescriptors(obj).
// Together with Object.defineProperties it can be used as a
// flags-aware way of cloning an object
// let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
//the old way was
// for (let key in user) {
//   clone[key] = user[key]
// }
//the drawBacks of this way are:
//1- ignores symbolic and non-enumerable properties
//2- It doesn't clone the flags(not flags aware)
//---------------------------------------------------------------------------
// Property descriptors work at the level of individual properties.
// There are also methods that limit access to the whole object:
//1-Object.preventExtensions(obj)--->Forbids the addition of new properties
//1-CHECK Object.isExtensible(obj)
//2-Object.seal(obj)-->Forbids adding/removing of properties.
//2-CHECK Object.isSealed(obj)
//3-Object.freeze(obj)-->Forbids adding/removing/changing of properties
//3-CHECK Object.isFrozen(obj)
