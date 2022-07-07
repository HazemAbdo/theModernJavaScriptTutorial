//NOTE it is Object.keys(obj) and not obj.keys()
//NOTE it is Object.values(obj) and not obj.values()
//NOTE it is Object.enteries(obj) and not obj.enteries()
//Main reason for that is flexibility
//as we can implement values, keys, entries methods in our own way
//and we can still use the defaults ones
//e.g. data.values() and Object.values(data)
//NOTE this functions ignore properties that use Symbol(...) as keys.
// return only symbols, use Object.getOwnPropertySymbols(obj)
// to return all properties including symbols Reflect.ownKeys(obj)
let user = {
  name: "John",
  age: 30,
  [Symbol("id")]: 123,
};
// loop over values
for (let value of Object.values(user)) {
  console.log(value); //doesn't print symbols
}
console.log("-----------------------------------------------------");
for (let value of Object.getOwnPropertySymbols(user)) {
  console.log(value); // print symbols
}
console.log("-----------------------------------------------------");
for (let value of Reflect.ownKeys(user)) {
  console.log(value); // print all
}
//--------------------------------------------------------------------
//Objects lack many methods that exist for arrays, e.g. map, filter..
//If we’d like to apply them, then we can use Object.entries
//followed by Object.fromEntries
//       enteries     fromEntries
//object------->array---------->object
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  Object.entries(prices).map((entry) => [entry[0], entry[1] * 2])
);
console.log(doublePrices); //{ banana: 2, orange: 4, meat: 8 }
console.log("-----------------------------------------------------");
//--------------------------------------------------------------------
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};
function sumSalaries(obj) {
  return Object.entries(obj).reduce((acc, current) => (acc += current[1]), 0);
}
console.log(sumSalaries(salaries));
console.log("-----------------------------------------------------");
//--------------------------------------------------------------------
let user2 = {
  name: "John",
  age: 30,
};
function count(obj) {
  return Object.entries(obj).length;
}
console.log(count(user)); // 2
