//--------------------------------------------------------Array Destructing-----------------------------------------------------------
//NOTE  let [item1 = default, item2, ...rest] = array

const { number } = require("yargs");

//NOTE in Array we depend that the elements are ordered
let arr = ["John", "Smith"];
//NOTE the array itself is not modified.
let [firstName, surName] = arr;
console.log("firstName", firstName); //John
console.log("surName", surName); //Smith
let [firstName2, surName2] = "John Smith".split(" ");
console.log("firstName2", firstName2); //John
console.log("surName2", surName2); //Smith
//NOTE Unwanted elements of the array can also be thrown away via an extra comma
let [firstName3, , title] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic",
];
console.log("firstName3", firstName3); //Julius
console.log("title", title); //Consul
//NOTE(right side) Actually, we can use it with any iterable, not only arrays:
let [a, b, c] = "abc";
console.log("a", a); //a
let [one, two, three] = new Set([1, 2, 3]);
console.log("one", one); //1
//NOTE(left side) We can use any “assignables” on the left side.For instance, an object property
let user = {};
[user.name, user.surname] = "John Smith".split(" ");
console.log("user.name", user.name); //John
//--------------------Iterate over object-----------------------
let user2 = {
  name: "John",
  age: 30,
};
for (const [key, value] of Object.entries(user2)) {
  console.log("key", key);
  console.log("value", value);
}
//--------------------Iterate over map-----------------------
let user3 = new Map();
user3.set("name", "John");
user3.set("age", "30");
for (const [key, value] of user3) {
  console.log("key", key);
  console.log("value", value);
}
//--------------------swap variables-----------------------
let guest = "Jane";
let admin = "Pete";
[guest, admin] = [admin, guest];
console.log("guest", guest); //pete
console.log("admin", admin); //jane
//--------------------...rest-----------------------
let [name1, name2, ...rest] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic",
];
console.log(rest); //It's an array-->  (2)['Consul', 'of the Roman Republic']
//--------------------default values-----------------------
let [name7 = "Guest", surName3 = "Anonymous"] = ["Julius"];
console.log("name7", name7); //Julius
console.log("surName", surName3); //Anonymous
//Default values can be more complex expressions or even function calls.
//They are evaluated only if the value is not provided.
// let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];//then second prompt will be evaluated
//--------------------------------------------------------Object Destructing-----------------------------------------------------------
//NOTE in object there is no order so we need to have same name of properties
// let {var1, var2} = {var1:…, var2:…}
//NOTE  let {prop : varName = default, ...rest} = object
let options = {
  title2: "Menu",
  width: 100,
  height: 200,
};
let { title2, width, height } = options; //same as let {  width,title2, height } = options(order doesn't matter)
console.log("title2", title2);
console.log("width", width);
console.log("height", height);
//what to do if we want use different names
// “what : goes where”
let { title2: t, width: w, height: h } = options;
console.log("h", h);
console.log("w", w);
console.log("t", t);
//--------------------default values-----------------------
//same as array
// let options = {
//   title: "Menu"
// };
// let {width = prompt("width?"), title = prompt("title?")} = options;
//--------------------we can combine = and :-----------------------
// let options = {
//   title: "Menu"
// };
// let {width: w = 100, height: h = 200, title} = options;
//--------------------...rest-----------------------
//same as array
let options2 = {
  title: "Menu",
  height: 200,
  width: 100,
};
let { title: ti, ...hAndW } = options2;
console.log("ti", ti);
console.log("hAndW", hAndW); //It is an object--> hAndW {height: 200, width: 100}
//--------------------An Error-----------------------
// let title, width, height;
// {title, width, height} = {title: "Menu", width: 200, height: 100};// error in this line
// //The problem is that JavaScript treats {...} in the main code flow
// // (not inside another expression) as a code block
// ({ title, width, height } = { title: "Menu", width: 200, height: 100 });// okay now
// console.log("title", title);
// console.log("width", width);
// console.log("height", height);
//--------------------------------------------------------Nested Destructing-----------------------------------------------------------
let options3 = {
  size: {
    width5: 100,
    height5: 200,
  },
  items: ["Cake", "Donut"],
  extra: true,
};
let {
  size: { width5, height5 },
  items: [item1, item2],
  title4 = "Menu",
} = options3;
console.log("item2", item2); //Donut
console.log("w5", width5); //200
// console.log("size", size);//Uncaught ReferenceError ReferenceError: size is not defined
// console.log("items", items);//ReferenceError ReferenceError: items is not defined
//Note that there are no variables for size and items, as we take their content instead.
//--------------------------------------------------------Smart function parameters-----------------------------------------------------------
//without destructing
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
//each time we call function
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
//Imagine 10 params
//We can pass parameters as an object, and the function immediately destructurizes them into variables:
// we pass object to function
let inputs = {
  title: "My menu",
  items: ["Item1", "Item2"],
};
// ...and it immediately expands it to variables
function showMenu({
  title = "Untitled",
  width = 200,
  height = 100,
  items = [],
} = {}) {
  // title, items – taken from options,
  // width, height – defaults used
  console.log(`${title} ${width} ${height}`); // My Menu 200 100
  console.log(items); // Item1, Item2
}
//we can make this object from JSON file and just pass it to the function
showMenu(inputs);
// NOTE showMenu(); //Uncaught TypeError TypeError: Cannot read property 'title' of undefined
//to solve the above problem
showMenu({});
//or a better solution that enables us to call function like this showMenu();
//is to make the whole object {title = "Untitled",width = 200,height = 100,items = [],} equals to {}
showMenu(); //no errors
//-------------------------------------------------------Tasks-------------------------------------------------------------
let user7 = { name4: "John", years: 30 };
let { name4: nam, years: age, isAdmin = false } = user7;
console.log(nam); // John
console.log(age); // 30
console.log(isAdmin); // false
//-------------------------------------------
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};
function topSalary(salaries) {
  let maxSalary = Number.NEGATIVE_INFINITY;
  let Employee = null;
  for (const [employee, salary] of Object.entries(salaries)) {
    console.log("topSalary ~ salary", salary);
    if (salary > maxSalary) {
      maxSalary = salary;
      Employee = employee;
    }
  }
  console.log(Employee);
}
topSalary(salaries);
