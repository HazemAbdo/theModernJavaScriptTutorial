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
