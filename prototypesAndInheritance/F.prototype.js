"use strict";
let animal = {
  eats: true,
};
function Rabbit(name) {
  this.name = name;
}
//--------------------
//Setting Rabbit.prototype = animal literally states the following:
//*"When a new Rabbit is created, assign its [[Prototype]] to animal".
//prototype is just a property of the function.
Rabbit.prototype = animal;
console.log(Rabbit.prototype); //{eats: true}
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
console.log(rabbit.eats); // true
//-------------------------------------

//The default "prototype" is an object with the only property constructor
//that points back //*to the function itself.
console.log(Rabbit.prototype); //{constructor: ƒ} //*default prototype
console.log(Rabbit.prototype.constructor); //ƒ Rabbit(name){this.name = name;}
let rabbit3 = new Rabbit("black Rabbit");
console.log(rabbit3.constructor == Rabbit); //true
//-------------------------------
//That’s handy when we have an object, don’t know which constructor was used for it
//(e.g. it comes from a 3rd party library),and we need to create another one of the same kind.
//I want rabbitDoNotKnow to be created with the same constructor as rabbit3 and I don’t know rabbit3 constructor.
let rabbitDoNotKnow = new rabbit3.constructor("white Rabbit");
console.log(rabbitDoNotKnow.constructor == Rabbit); //true
//------------------------------------------------------------------------------------------------
//But probably the most important thing about "constructor" is that… …JavaScript itself does
//not ensure the right "constructor" value.Yes, it exists in the default "prototype" for functions,
// but that’s all. What happens with it later – is totally on us.In particular,
//!if we replace the default prototype as a whole, then there will be no "constructor" in it.For instance:
function Rabbit2() {}
Rabbit2.prototype = {
  jumps: true,
};
let rabbit2 = new Rabbit2();
console.log("rabbit2.constructor === Rabbit2", rabbit2.constructor === Rabbit2); // false
//--------the solution------
//So, to keep the right "constructor" we can choose to add/remove properties
//to the default "prototype" instead of overwriting it as a whole
function Rabbit4() {}
let rabbit4 = new Rabbit4();
Rabbit4.prototype.jumps = true;
console.log(rabbit4.constructor === Rabbit4); // true
console.log(rabbit4.jumps); // true
//----------------------------------------------------------TASKS---------------------------------------------
console.log("------------task1------------------");
function Rabbit5() {}
Rabbit5.prototype = {
  eats: true,
};

let rabbit5 = new Rabbit5();
//-----------------------------
console.log(rabbit5.eats); //?-->true
//-----------------------------
//The assignment to Rabbit.prototype sets up [[Prototype]] for new objects,
//but it //*does not affect the existing ones.
Rabbit5.prototype = {};
console.log(rabbit5.eats); // ?-->true
//-----------------------------
//Objects are assigned by reference. The object from Rabbit.prototype is not duplicated, it’s still a single
//object //* referenced both by Rabbit.prototype and by the [[Prototype]] of rabbit.
//So when we change its content through one reference, it is visible through the other one.
Rabbit5.prototype.eats = false; //or rabbit5.eats = false;
console.log(rabbit5.eats); // ?-->false
//-----------------------------
//All delete operations are applied //*directly to the object.
// Here delete rabbit.eats tries to remove eats property from rabbit, but it doesn’t have it.
//So the operation won’t have any effect.
delete rabbit5.eats;
console.log(rabbit5.eats); // ?-->true
//-----------------------------
// The property eats is deleted from the prototype, it doesn’t exist any more.
delete Rabbit5.prototype.eats;
console.log(rabbit5.eats); // ?-->undefined
console.log("------------task2------------------");
//Imagine, we have an arbitrary object obj, created by a constructor function
//– we don’t know which one, but we’d like to create a new object using it.
//Can we do it like that?
//Give an example of a constructor function for obj which lets such code work right.
//And an example that makes it work wrong.
function GoodConstructor() {
  this.name = "haha";
}
let objGood = new GoodConstructor();
//if we don’t touch the default "prototype", then this code works for sure
// It worked, because //* User.prototype.constructor == User
let obj2Good = new objGood.constructor();
console.log(objGood.name); //haha
console.log(obj2Good.name); //haha
function BadConstructor() {
  this.name = "lol";
}
BadConstructor.prototype = {};
let objBad = new BadConstructor();
console.log(objBad.name); //lol
let obj2Bad = new objBad.constructor();
console.log(obj2Bad.name); //undefined
//why user2.name is undefined?
//Here’s how new user.constructor('Pete') works:
//------------------------------------------------
//1-First, it looks for constructor in //*user. -->Nothing
//2-Then it follows the prototype chain.The prototype of user is //*User.prototype, 
//and it also has no constructor (because we “forgot” to set it right!).
//3-Going further up the chain, User.prototype is a plain object, its //*prototype is the built-in Object.
//prototype. Finally, for the built-in //*Object.prototype, 
// there’s a built-in //*Object.prototype.constructor == Object. 
// So it is used.Finally, at the end, we have let user2 = new Object('Pete')