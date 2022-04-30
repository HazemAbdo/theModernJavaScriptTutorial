//to make the calls chainable
// The solution is to return the object itself from every call.
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function () {
    // shows the current step
    print(this.step);
    return this;
  },
};
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
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
