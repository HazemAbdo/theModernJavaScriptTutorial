function p(str) {
  console.log(str);
}
//----------------------------------------------------------
// let users = [
//   { id: "john", name: "John Smith", age: 20 },
//   { id: "ann", name: "Ann Smith", age: 24 },
//   { id: "pete", name: "Pete Peterson", age: 31 },
// ];

// let usersById = groupById(users);
// function groupById(arr) {
//   let usersById = {};
//   arr.map(function (user) {
//     usersById[user.id] = user;
//   });
//   return usersById;
// }
// p(usersById);
/*
// after the call we should have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
//----------------------------------------------------------
// function unique(arr) {
//   let recipeMap = new Set(arr);
//   return recipeMap;
// }

// let strings = [
//   "Hare",
//   "Krishna",
//   "Hare",
//   "Krishna",
//   "Krishna",
//   "Krishna",
//   "Hare",
//   "Hare",
//   ":-O",
// ];

// p(unique(strings)); // Hare, Krishna, :-O
//----------------------------------------------------------
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 29 };
// let arr = [john, pete, mary];

// function getAverageAge(arr) {
//  return  arr.reduce(function (accumulator, item) {
//     return (accumulator + item.age);
//   }, 0)/ arr.length;
// }

// p(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
//----------------------------------------------------------
// let arr = [1, 2, 3, 5, 7, 8, 9, 10];
// function shuffle(arr) {
//   for (let index = 0; index < arr.length; index++) {
//     let temp = arr[index];
//     let rand = Math.floor(Math.random() * arr.length);
//     arr[index] = arr[rand];
//     arr[rand] = temp;
//   }
//   return arr;
// }
//---------or------------
//NOTE But because the sorting function is not meant to be used this way,
// not all permutations have the same probability
// sort is a “black box”: we throw an array and a comparison function into
// it and expect the array to be sorted. But due to the utter randomness of the
// comparison the black box goes mad, and how exactly it goes mad depends on the concrete
// implementation that differs between engines
// function shuffle(array) {
//   return array.sort(() => Math.random() - 0.5);
// }
// p(shuffle(arr));
// p(shuffle(arr));
// p(shuffle(arr));
// p(shuffle(arr));
// p(shuffle(arr));
//----------------------------------------------------------
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let arr = [pete, john, mary];

// sortByAge(arr);
// function sortByAge(arr) {
//   arr.sort((a, b) => a.age - b.age);
// }
// // now: [john, mary, pete]
// p(arr[0].name); // John
// p(arr[1].name); // Mary
// p(arr[2].name); // Pete
//----------------------------------------------------------
// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };

// let users = [john, pete, mary];

// let usersMapped = users.map(function (element) {
//   return { fullName: element.name + " " + element.surname, id: element.id };
// });
//-------or-------
//NOTE  there are two arrow functions: without body value => expr and with body value => {...}
//Please note that in the arrow functions we need to use additional brackets.
//Here JavaScript would treat { as the start of function body, not the start of the object.
//The workaround is to wrap them in the “normal” brackets:
// let usersMapped = users.map((user) => ({
//   //DO =>({})
//   //DONOT =>{}
//   fullName: `${user.name} ${user.surname}`,
//   id: user.id,
// }));
// p(usersMapped[0].id); // 1
// p(usersMapped[0].fullName); // John Smith
//----------------------------------------------------------
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };
// let users = [john, pete, mary];
// let names = users.map((element) => element.name);
// /* ... your code */
// p(names); // John, Pete, Mary
//----------------------------------------------------------
// function Calculator() {
//   let operations = {
//     "+": (a, b) => a + b,
//     "-": (a, b) => a - b,
//   };
//   this.calculate = (expression) => {
//     let firstSpace = expression.indexOf(" ");
//     let secondSpace = expression.lastIndexOf(" ");
//     let firstNumber = +expression.slice(0, firstSpace);
//     let operator = expression.slice(firstSpace + 1, secondSpace);
//     let secondNumber = +expression.slice(secondSpace);
//     if (operator in operations) {
//       return operations[operator](firstNumber, secondNumber);
//     } else {
//       return "this operator is not supported yet";
//     }
//   };
//   this.addMethod = (operator, func) => {
//     operations[operator] = func;
//   };
// }
// let calc = new Calculator();
// p(calc.calculate("3 - 7")); // -4
// p(calc.calculate("3 + 7")); // 10
// p(calc.calculate("3 * 7")); // not supported
// calc.addMethod("*", (a, b) => a * b);
// p(calc.calculate("3 * 7")); // 21
// calc.addMethod("/", (a, b) => a / b);
// calc.addMethod("**", (a, b) => a ** b);
// p(calc.calculate("7 / 7")); // 1
// p(calc.calculate("2 ** 10")); // 1024

//----------------------------------------------------------
// let arr = ["HTML", "JavaScript", "CSS"];

// let sorted = copySorted(arr);
// function copySorted(arr) {
//   return arr.slice().sort();
// }
// p(sorted); // CSS, HTML, JavaScript
// p(arr); // HTML, JavaScript, CSS (no changes)
//----------------------------------------------------------
// let arr = [5, 2, 1, -10, 8];

// arr.sort((a, b) => a - b).reverse();
// //-------------or----------------
// arr.sort((a, b) => b - a);
// p(arr); // 8, 5, 2, 1, -10
//----------------------------------------------------------
// let arr = [5, 3, 8, 1];

// filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
// function filterRangeInPlace(arr, start, end) {
//   arr.forEach((element, index) => {
//     if (element < start || element > end) {
//       arr.splice(index, 1);
//     }
//   });
//   return arr;
// }
// p(arr); // [3, 1]
//----------------------------------------------------------
// let arr = [5, 3, 8, 1, 10, 15, 2, 3, 4, 1, 100, -100];
// let filtered = filterRange(arr, 1, 4);
// function filterRange(arr, start, end) {
// let newArr = [];
// arr.forEach(function (item) {
//   if (item >= start && item <= end) newArr.push(item);
// });
// return newArr;
//------------------------or---------------------
// return arr.filter((item) => item >= start && item <= end);
// }
// p(filtered); // 3,1 (matching values)
// p(arr); // 5,3,8,1 (not modified)
//----------------------------------------------------------
// p(camelize("background-color"));
// p(camelize("list-style-image"));
// p(camelize("-webkit-transition"));

// function camelize(str) {
//   let arr = str.split("");
//   return arr.reduce(function (acc, item) {
//     if (acc.charAt(acc.length - 1) == "-") {
//       acc = acc.slice(0, -1);
//       return acc + item.toUpperCase();
//     }
//     return acc + item;
//   }, "");
// }
//----------------------------------------------------------
// let army = {
//   minAge: 18,
//   maxAge: 27,
//   canJoin(user) {
//     return user.age >= this.minAge && user.age < this.maxAge;
//   },
// };

// let users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];
// // arr.find(func, thisArg);
// // arr.filter(func, thisArg);
// // arr.map(func, thisArg);
// // thisArg is the optional last argument
// //The value of thisArg parameter becomes this for func
// // find users, for who army.canJoin returns true
// //The first time we pass thisArg to the function, it will be the object army.
// //As we the condition we check is not applied on
// // the array that calls filter(users) but on the object (army)
// let soldiers = users.filter(army.canJoin, army);
// // let soldiers = users.filter((user) => army.canJoin(user));
// console.log(soldiers.length); // 2
// console.log(soldiers[0].age); // 20
// console.log(soldiers[1].age); // 23
// //------------------------------------------------
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let sum = arr.reduce((sum, item) => sum + item, 0);
// p(sum);
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let newArr = [];
// function ascendingSort(a, b) {
//   return a - b;
// }
// function descendingSort(a, b) {
//   return b - a;
// }
// arr.sort();
// p(arr); // [1, 10, 2, 3, 4, 5, 6, 7, 8, 9] as it is deals with them as strings by default
// arr.sort(ascendingSort);
// p(arr);
// arr.sort(descendingSort);
// p(arr);
// //It only calls the function for each element of the array
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let newArr = [];
// newArr = arr.forEach(function (item) {
//   p(item);
// });
// p(newArr);
// p(arr);
// //It calls the function for each element of the array and returns the array of results.
// newArr = arr.map((item) => (item > 5 ? item * 2 : item));
// p(newArr);
// p(arr);
//TODO maxSubArray Task
// let styles = ["Jazz", "Blues"];
// styles.push("Rock-n-Roll");
// p(styles.length);
// styles[Math.floor(styles.length / 2)] = "classics";
// p(styles);

// p(styles.shift());
// styles.unshift("Reggae");
// styles.unshift("Rap");
// p(styles);
// let fruits = ["Apple", "Orange", "Plum"];
//NOTE length property is writable
//If we increase it manually, nothing interesting happens.
//But if we decrease it, the array is truncated. The process is irreversible
// fruits.length = 2; //fruits=["Apple","Orange"]
// p(fruits);
//NOTE If new Array is called with a single argument which is a number,
//then it creates an array without items, but with the given length
// let arr = new Array(2);
// p(arr);//[...]
// console.log(fruits.at(-1));
//NOTE push and pop deal with end of the array(faster)
//NOTE unshsift and shift deal with start of the array(slower)
