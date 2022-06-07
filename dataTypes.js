const { Console } = require("console");
const { func } = require("prop-types");
function p(str) {
  console.log(str);
}
p(camelize("background-color"));
p(camelize("list-style-image"));
p(camelize("-webkit-transition"));

function camelize(str) {
  let arr = str.split("");
  return arr.reduce(function (acc, item) {
    if (acc.charAt(acc.length - 1) == "-") {
      acc = acc.slice(0, -1);
      return acc + item.toUpperCase();
    }
    return acc + item;
  }, "");
}

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
