// function print(x) {
//   console.log(x);
// }
// function isEmpty(obj) {
//   for (key in obj) {
//     return false;
//   }
//   return true;
// }
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
