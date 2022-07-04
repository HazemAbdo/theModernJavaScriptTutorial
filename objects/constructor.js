// DO you must assign everything to this in the constructor
//When a function is executed with new, it does the following steps:
//A new empty object is created and assigned to this.
//The function body executes. Usually it modifies this, adds new properties to it.
//The value of this is returned.
function Calculator() {
  this.read = () => {
    this.firstVal = +prompt("please enter the first value", "5");
    this.secondVal = +prompt("please enter the second value", "3");
  };
  this.sum = () => {
    return this.firstVal + this.secondVal;
  };
  this.mul = () => {
    return this.firstVal * this.secondVal;
  };
}
let calculator = new Calculator();
calculator.read();
alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());

//NOTE Is it possible to create functions A and B so that new A() == new B()?
//NOTE If a function returns an object then new returns it instead of this
// let obj = {};
// function A() {
//   return obj;
// }
// function B(name) {
//   return obj;
// }

// let a = new A();
// let b = new B();

// console.log(a == b); // true

// let ann = new User("ann");
// console.log("ann", ann);
// let hazem = new User("hazem");
// console.log("hazem", hazem);

// function User(name) {
//   // this = {};  (implicitly)

//   // add properties to this
//   this.name = name;
//   this.isAdmin = false;

//   // return this;  (implicitly)
// }
// let haz = new (function () {
//   this.name = "haz";
//   this.isAdmin = true;
// })();
// console.log("haz ~ haz", haz);
// class NameField {
//   constructor(name) {
//     const field = document.createElement("li");
//     field.textContent = name;
//     const nameListHook = document.querySelector("#names");
//     nameListHook.appendChild(field);
//   }
// }

// class NameGenerator {
//   constructor() {
//     const btn = document.querySelector("button");
//     //DONOT this.addName()
//     //if you make it this.addName()
//     //then the func will get executed even before the btn is clicked
//     //DO this.addName
//     //you need to make it this.addName
//     //then you just pass a reference of addName to the eventListener
//     //so when the btn is clicked it executes the addName
//     //DONOT names
//     //DO this.name
//     //if you leave it names then you can't access it from addName
//     //addName can only access class methods or global functions
//     //and in the case of names then it only can be accessed within constructor
//     //to create a property you must make it this.names(to attach names to the class)
//     //DONOT this.addName
//     //DO this.addName.bind(this)
//     this.names = ["Max", "Manu", "Anna"];
//     this.currentName = 0;
//     // this.addName.bind(this) tells addName that whenever you got executed
//     //use the this passed to bind not the one that executes you
//     //DO
//     // btn.addEventListener("click", this.addName.bind(this));
//     //DO it is also true
//     //()=>this.addName()===function{return this.addName();}
//     //so it will not get executed(the outer function) without the button get pressed
//     btn.addEventListener("click", () => this.addName());
//   }

//   addName() {
//     //NOTE this refers to whoever called a method that uses this
//     //due to that ass btn is the one that called addName then
//     //this will refers to btn not the object
//     //to fix that this.addName.bind(this)
//     //arrow functions is used to solve this problem without the need of bind
//     const name = new NameField(this.names[this.currentName++ % 3]);
//   }
// }

// const gen = new NameGenerator();
