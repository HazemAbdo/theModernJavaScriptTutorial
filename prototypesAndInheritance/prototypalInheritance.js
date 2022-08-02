//In JavaScript, //*objects have a special hidden property [[Prototype]] , 
//that is either null or references another object. That object is called “a prototype”:
//--------------
//When we read a property from object, and it’s missing, JavaScript automatically
//takes it from the //*prototype.
//--------------
//There are only two limitations:
//The references can’t go in circles. JavaScript will throw an error if we try to assign
//! __proto__ in a circle.
//The value of __proto__ can be either an //*object or null.Other types are ignored.
//An object may not inherit from two others.//*there can be only one [[Prototype]].
//--------------
//*__proto__ is a historical getter/setter for [[Prototype]]
//Please note that __proto__ is not the same as the internal [[Prototype]] property.
//It’s a getter/setter for [[Prototype]]
// modern JavaScript suggests that we should use //*Object.getPrototypeOf/Object.setPrototypeOf
//--------------
//The prototype is only used for //*reading properties.
//Write/delete operations work directly with the object.
//--------------
//when the inheriting objects run the inherited methods,
//they will modify only //*their own states, not the state of the big object.
//As a result, methods are shared, but the object state is not.
//If we call obj.method(), and the method is taken from the prototype, //*this still references obj.
//So methods always work with the current object even if they are inherited.
//--------------
//The for..in loop iterates over both its own and its inherited properties.
//All other key/value-getting methods only operate on the object itself
//----------------------------------------------------Tasks----------------------------------------------------
// let animal = {
//   jumps: null,
// };
// let rabbit = {
//   __proto__: animal,
//   jumps: true,
// };

// console.log(rabbit.jumps); // ? (1)-->true

// delete rabbit.jumps;

// console.log(rabbit.jumps); // ? (2)-->null

// delete animal.jumps;

// console.log(rabbit.jumps); // ? (3)-->undefined
//----------------------------------------------------------------
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};
// console.log(pockets.pen);
// console.log(bed.glasses);
//? Answer the question: is it faster to get glasses as pockets.glasses or head.glasses?
//In modern engines, performance-wise, there’s no difference whether we take a property from an object
//or its prototype. They remember where the property was found and reuse it in the next request.
//----------------------------------------------------------------
let animal = {
  eat() {
    this.full = true;
  },
};

let rabbit = {
  __proto__: animal,
};

rabbit.eat();
//? If we call rabbit.eat(), which object receives the full property: animal or rabbit?-->rabbit(it is the object before dot)
//*Property lookup and execution are two different things.
//The method rabbit.eat is first found in the prototype, then executed with this=rabbit
//----------------------------------------------------------------
//We have two hamsters: speedy and lazy inheriting from the general
//hamster object.When we feed one of them, the other one is also full.
//Why?Let’s look carefully at what’s going on in the call speedy.eat("apple").
// The method speedy.eat is found in the prototype (=hamster), then executed with this=speedy
// Then this.stomach.push() needs to find stomach property and call push on it.
// It looks for stomach in this (=speedy), but nothing found.
// Then it follows the prototype chain and finds stomach in hamster.
// Then it calls push on it, adding the food into the stomach of the prototype.
//* So all hamsters share a single stomach!
//How can we fix it?-->make a separated array for each of them(*)
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  },
};
let speedy = {
  __proto__: hamster,
  stomach: [], //(*)
};
let lazy = {
  __proto__: hamster,
  stomach: [], //(*)
};
// This one found the food
speedy.eat("apple");
console.log(speedy.stomach); // apple //after modification --->[apple]
// This one also has it, why? fix please.
console.log(lazy.stomach); // apple //after modification --->[]
