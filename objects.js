function p(str) {
  console.log(str);
}

// function extractCurrencyValue(str)
// {
//   return str.slice(1);
// }
// p(extractCurrencyValue("$12000000000000"));
// function truncate(str, maxLength) {
//   if (str.length <= maxLength) return str;
//   else return str.slice(0, maxLength - 1) + "...";
// }
// p(truncate("What I'd like to tell on this topic is:", 20) );

// p(truncate("Hi everyone!", 20));
// function checkSpam(str) {
//   var lowerStr = str.toLowerCase();
//   return lowerStr.includes("viagra") || lowerStr.includes("xxx");
// }
// p(checkSpam("buy ViAgRA now"));
// p(checkSpam("free xxxxx"));
// p(checkSpam("innocent rabbit"));

// function ucFirst(str) {
//   return str == null || str == "" ? str : str[0].toUpperCase() + str.slice(1);
// }
// p(ucFirst(null));

//NOTE substrings methods
//.includes() .startsWith .endsWith() if you want to check only existence
// .indexOf() .lastIndexOf() if you want to check existence and get position
//to get substring==> substring() substr() slice()
//slice(start,end)==>[start:end[ ///slice(start)==>[start:end]
//slice(-num,-num2)   str="haha" -3 -2 -1 *
// substring() almost the same as slice but it allows start > end && any -num is 0
//str.substr(start [, length]) start can be -num
// let str = "Widget with id";
//why not check with just==> if(str.indexOf("Widget"))  ?
//The answer is what if it founds the substring at index 0?
// a tricky alternative for str.indexOf("Widget") != -1 is ~str.indexOf("")
//~n===-(n+1) so it's only false if n=-1
//if (~str.indexOf(...)) reads as “if found”
// if (str.indexOf("Widget") != -1) {
//     p("We found it");
// }
// let str = "Widget with id";
// p(str.indexOf("Widget"));
// p(str.indexOf("widget"));
// p(str.indexOf("id"));

//NOTE how to internationalization strings comparison??
//Luckily, all modern browsers (IE10- requires the additional library Intl.js)
//support the internationalization standard ECMA-402.
//It provides a special method to compare strings in
//different languages,following this language special rules for arranging letters
// str.localeCompare(str2)
//Returns a negative number if str is less than str2.
//Returns a positive number if str is greater than str2.
//Returns 0 if they are equivalent
// p("Österreich".localeCompare("Zealand"));

// let str = `Hello`;
//The only difference between them is that if no character is found,
//[] returns undefined, and charAt returns an empty string
// p(str[1000]);
// p(str.charAt(1000));
//Math.random=>[0,1[
//if 0 I want to make sure that num>=min
//if 1 I want to make sure that num<max
// function random(min, max) {
//   let rand = Math.random();
//   return (rand * max + (1 - rand) * min) % max;
// }
// p(random(1, 5));
// p(random(1, 5));

//if you only want numbers
//then take care that null and "" are corner cases in case
//you use isNan or isFinite
// function isNumber(n) {
//   return isFinite(n) && !(n == null || n == "");
// }
// p(isNumber(5));
// p(isNumber());
// p(isNumber(""));
// p(isNumber("z"));
// p(isNumber("10z"));
// p(isNumber(null));

//TODO solve the examples of Numbers
//Internally the decimal fraction 6.35 is an endless binary.
//As always in such cases, it is stored with a
//The precision loss can cause both increase and decrease of a number.
//In this particular case the number becomes a tiny
//bit less, that’s why it rounded down.
// p((6.35).toFixed(1)); //Not correct 6.3 not 6.4
//To solve this
// p(Math.round(6.35 * 10) / 10); //will return 6.4(T)
// p((1.35).toFixed(1));

// let a = 5e6;
// console.log("a", a);
// let b = 5e-6;
// console.log("b", b);
//_ here is called syntax sugar
// In computer science, syntactic sugar is syntax within a programming
// language that is designed to make things easier to read or to express.
// It makes the language "sweeter" for human use:
// let billion = 1_000_000_000;
// console.log("billion", billion);
// console.log(0xff);
// console.log(0b11111111);
// console.log(0xff);
// let num = 255;
// console.log(num.toString(2));
// console.log(num.toString(16));
// console.log(num.toString(8));
// console.log((255).toString(16));
// let nu = 12.346566449;
// console.log(nu.toFixed(2));
// console.log(nu.toFixed(3));
// console.log(nu.toFixed(4));
// console.log(nu.toFixed(5));
// p(isNaN("str"));
//NOTE The value NaN is unique in that it is not equal itself
// p(NaN === NaN);
// p(isFinite(Infinity));
//Object.is is a built-in function that checks if two values
//are the same value.
// p(Object.is(NaN, NaN)); //NOTE TRUE
//hints tell you the primitive type that should be used in the
// context of the object

//------------------------------------------
//user becomes a self-descriptive string or a
//money amount, depending on the conversion. The single method
//DO [Symbol.toPrimitive] handles all conversion cases
// let user = {
//   name: "John",
//   money: 1000,

//   [Symbol.toPrimitive](hint) {
//     alert(`hint: ${hint}`);
//     return hint == "string" ? `{name: "${this.name}"}` : this.money;
//   },
// };
// // conversions demo:
// alert(user); // hint: string -> {name: "John"}
// alert(+user); // hint: number -> 1000
//why + is default?
//as binary plus + can work both with strings
//(concatenates them) and numbers (adds them)
// alert(user + 500); // hint: default -> 1500
//------------------------------------------

//If there’s no Symbol.toPrimitive then JavaScript tries to
//find methods toString and valueOf:
//For the "string" hint: call toString method, and if it doesn’t exist,
//then valueOf (so toString has the priority for string conversions).
//For other hints: valueOf, and if it doesn’t exist,
//then toString (so valueOf has the priority for maths)
// let user = {
//   name: "John",
//   money: 1000,

//   // for hint="string"
//   toString() {
//     return `{name: "${this.name}"}`;
//   },

//   // for hint="number" or "default"
//   valueOf() {
//     return this.money;
//   },
// };

// alert(user); // toString -> {name: "John"}
// alert(+user); // valueOf -> 1000
// alert(user + 500); // valueOf -> 1500
// let user = {
//   name: "hello",
//   age: 15,
//   address: {
//     street: "kakkk",
//   },
//   sayHi() {
//     console.log("ahhhhhhhhhhhhh");
//   },
// };
// let user2 = {};
// console.log(user?.name);
// console.log(user?.["age"]);
// user.sayHi?.();
// console.log(user2?.address?.street);

// function Accumulator(initialVal) {
//   this.value = initialVal;
//   this.read = () => {
//     this.value += +prompt("please enter a number", "ex:5");
//   };
// }
// let accumulator = new Accumulator(1); // initial value 1

// accumulator.read(); // adds the user-entered value
// accumulator.read(); // adds the user-entered value

// alert(accumulator.value); // shows the sum of these values

// DO you must assign everything to this in the constructor
//When a function is executed with new, it does the following steps:
//A new empty object is created and assigned to this.
//The function body executes. Usually it modifies this, adds new properties to it.
//The value of this is returned.
// function Calculator() {
//   this.read = () => {
//     this.firstVal = +prompt("please enter the first value", "5");
//     this.secondVal = +prompt("please enter the second value", "3");
//   };
//   this.sum = () => {
//     return this.firstVal + this.secondVal;
//   };
//   this.mul = () => {
//     return this.firstVal * this.secondVal;
//   };
// }
// let calculator = new Calculator();
// calculator.read();
// alert("Sum=" + calculator.sum());
// alert("Mul=" + calculator.mul());

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

//to make the calls chainable
// The solution is to return the object itself from every call.
// let ladder = {
//   step: 0,
//   up() {
//     this.step++;
//     return this;
//   },
//   down() {
//     this.step--;
//     return this;
//   },
//   showStep: function () {
//     // shows the current step
//     print(this.step);
//     return this;
//   },
// };
// ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
// ladder.up().showStep();
// let calculator = {
//   read() {
//     this.a = +prompt("Please enter a", "5");
//     this.b = +prompt("Please enter b", "4");
//   },
//   sum() {
//     return this.a + this.b;
//   },
//   mul() {
//     return this.a * this.b;
//   },
// };

// calculator.read();
// alert(calculator.sum());
// alert(calculator.mul());

// let user = {
//   name: "John",
//   age: 30,
//   sayHi: function () {
//     print("Hello! " + this.name);
//   },
//   sayHalloz() {
//     print("Halloz!");
//   },
// };

// user.sayHi(); // Hello!
// user.sayHalloz(); // Hello!

//-------------------------------------------
//this make another copy of "hello"(the value itself)
//container1|message("hello")
//container2|phrase("hello")
//two independent variables,
//each one storing the string "Hello!"
// let message = "hello";
// console.log("message", message);
// let phrase = message;
// console.log("phrase", phrase);
// phrase = "hello world";
// console.log("message", message);
// console.log("phrase", phrase);
//------------------------------------------
//A variable assigned to an object stores
//not the object itself, but its “address in
//memory” – in other words “a reference” to it
// let user = {
//   name: "John",
// };
//both of them refer to the same obj
// let admin = user;
// admin.name = "hazoom";
// print(user.name);
// let a = {};
// let b = a;
//both return true as the refer to the same obj
// print(a == b); //T
// print(a === b); //T
//even x,y the look the same but they are two different objects
// let x = {};
// let y = {};
// print(x === y); //F
// print(x === y); //F
//what of we want to duplicate not a reference
//the it is the time to introduce cloning
// let user = {
//   name: "hazem",
//   age: 30,
// };
// let clone1 = {};
// let clone2 = {};
// for (let key in user) {
//   clone1[key] = user[key];
// }
// print(clone1);
// clone1.name = "haha";
// print(clone1);
// print(user);
// Object.assign(clone2, user, clone1);
// console.log("clone2", clone2);
// let user = {
//   name: "John",
//   sizes: {
//     height: 182,
//     width: 50,
//   },
// };
// let clone = {};
// Object.assign(clone, user);
//this returns True which means sizes
//is just a reference
//to solve it just use deep cloning
//either by built it or using loadsh library
// _.cloneDeep(obj)
// print(clone.sizes === user.sizes);
//as user is const
//it must always reference the same object,
//but properties of that object are free to change
// const user = {
//   name: "john",
// };
// console.log("user", user);
// user.name = "pete";
// console.log("user", user);

//------------------------------------------
function print(x) {
  console.log(x);
}
function isEmpty(obj) {
  for (key in obj) {
    return false;
  }
  return true;
}
// function multiplyNumeric(menu) {
//   for (key in menu)
//     if (typeof menu[key] === "number") menu[key] = 2 * menu[key];
// }
// menu = {
//   width: 400,
//   height: 600,
//   title: "My menu",
// };
// multiplyNumeric(menu);
// print(menu);

// let salaries = {
//   John: 100,
//   Ann: 160,
//   Pete: 130,
// };
// function sumSalaries(obj) {
//   if (isEmpty(obj)) return 0;
//   let sum = 0;
//   for (let key in obj) {
//     sum += obj[key];
//   }
//   return sum;
// }
// print(sumSalaries(salaries));
//------------------------
// let user = {};
// user.name = "John";
// user.surname = "Smith";
// console.log("user", user);
// user.name = "Pete";
// console.log("user", user);
// delete user.name;
// console.log("user", user);
//------------------------
// let schedule = {};
// console.log("isEmpty(schedule)", isEmpty(schedule));
// schedule["8:30"] = "get up";
// console.log("isEmpty(schedule)", isEmpty(schedule));
// function isEmpty(obj) {
//   for (key in obj) {
//     return false;
//   }
//   return true;
// }
