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

