//strict mode:
"use strict";
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}
//Functions counter and counter2 are created by different invocations of makeCounter.
//So they have independent outer Lexical Environments, each one has its own count
let counter = makeCounter();
let counter2 = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter2()); //?-->answer is 0
console.log(counter2()); //?-->answer is 1
//----------------------------------------------------------
function Counter() {
  let count = 0;
  //Both nested functions are created within the same outer Lexical Environment,
  //so they share access to the same count variable:
  this.up = function () {
    return ++count;
  };
  this.down = function () {
    return --count;
  };
}
let counter3 = new Counter();
console.log(counter3.up()); // ?-->answer is 1
console.log(counter3.up()); // ?-->answer is 2
console.log(counter3.down()); // ?-->answer is 1
//----------------------------------------------------------
let phrase = "Hello";
if (true) {
  let user = "John";
  // The function sayHi is declared inside the if, so it only lives inside it. There is no sayHi outside.
  function sayHi() {
    console.log(`${phrase}, ${user}`);
  }
  sayHi(); //?-->answer is Hello, John
}
// sayHi(); //?-->error sayHi is not defined
//----------------------------------------------------------
function sum(a) {
  return function (b) {
    return a + b;
  };
}
//For the second parentheses to work, the first ones must return a function.
console.log(sum(1)(2));
console.log(sum(5)(-1));
//-----------------------------------------------
let x = 1;
function func() {
  // the local variable x is known to the engine from the beginning of the function,
  // but "uninitialized" (unusable) until let dead zone
  //looks in inner then outer that's why it doesn't look for outer x=1
  console.log(x); // ?--> Cannot access 'x' before initialization
  let x = 2;
}
// func();
//-----------------------------------------------------
/* .. your code for inBetween and inArray */
function inBetween(start, end) {
  return function (item) {
    return item >= start && item <= end;
  };
}
function inArray(arrToSearch) {
  return function (item) {
    return arrToSearch.includes(item);
  };
}
let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
console.log(arr.filter(inArray([1, 2, 10]))); // 1,2
//-----------------------------------------------
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" },
];
//The usual way to do that would be:
// by name (Ann, John, Pete)
// let sortedByName = users.sort((a, b) => (a.name > b.name ? 1 : -1));
// console.log("sortedByName", sortedByName);
// // by age (Pete, Ann, John)
// let sortedByAge = users.sort((a, b) => (a.age > b.age ? 1 : -1));
// console.log("sortedByAge", sortedByAge);
function byField(fieldName) {
  return function (a, b) {
    return a[fieldName] > b[fieldName] ? 1 : -1;
  };
}
let sortedByName = users.sort(byField("name"));
console.log("sortedByName", sortedByName);
let sortedByAge = users.sort(byField("age"));
console.log("sortedByAge", sortedByAge);
//---------------------------
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function () {
      // create a shooter function,
      console.log("i", i); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
//We can see that all shooter functions are created in the
//lexical environment of makeArmy() function. But when army[i]()
//is called, makeArmy has already finished its job,
//and the final value of i is 10 (while stops at i=10).
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
//NOTE the solution
function makeArmy2() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    //DO
    let j = i;
    let shooter = function () {
      // create a shooter function,
      console.log("j", j); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army2 = makeArmy2();

//Here let j = i declares an iteration-local variable j and copies i into it.Primitives are copied “by value”,
//so we actually get an independent copy of i, belonging to the current loop iteration.
//The shooters work correctly, because the value of i now lives a little bit closer. Not in makeArmy()
//Lexical Environment, but in the Lexical Environment that corresponds to the current loop iteration
army2[0](); // 0
army2[1](); // 1
army2[2](); // 2
