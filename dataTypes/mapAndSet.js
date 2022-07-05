let map4 = new Map();
map4.set("name", "John");
let keys = Array.from(map4.keys());
// Error: keys.push is not a function
keys.push("more");
console.log("keys", keys);
//---------------------------------------------------------------------------------------
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
function aclean(arr) {
  let map = new Map();
  for (let word of arr) {
    //nap, pan -> anp
    //ear, era, are -> aer
    //cheaters, hectares, teachers -> aceehrst
    let sorted = word.toLowerCase().split("").sort().join();
    map.set(sorted, word);
  }
  return Array.from(map.values());
}
console.log(aclean(arr)); // "nap,teachers,ear" or "PAN,cheaters,era"
//---------------------------------------------------------------------------------------
function unique(arr) {
  return Array.from(new Set(arr));
}
let values = [
  "Hare",
  "Krishna",
  "Hare",
  "Krishna",
  "Krishna",
  "Krishna",
  "Hare",
  "Hare",
  ":-O",
];

console.log(unique(values));
//---------------------------------------------------------------------------------------
//Iteration over Map and Set is always in the insertion order, so we can’t say
//that these collections are unordered, but we can’t reorder elements or directly
//get an element by its number.
//---------------------------------------------------------------------------------------
//A Set is a special type collection – “set of values” (without keys),
//where each value may (((occur only once)))
let set = new Set(["oranges", "apples", "bananas"]);
for (let value of set) console.log(value);
// the same with forEach:
//Note the funny thing. The callback function passed in forEach has 3 arguments: a value,
// then the same value valueAgain, and then the target object
//That’s for compatibility with Map
set.forEach((value, valueAgain, set) => {
  console.log(value);
});
//---------------------------------------------------------------------------------------
//object from [[],[],[]](map)
let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
]);
console.log(prices.orange); //2
let map3 = new Map();
map3.set("banana", 1);
map3.set("orange", 2);
map3.set("meat", 4);
let obj2 = Object.fromEntries(map3.entries());
let obj3 = Object.fromEntries(map3);
console.log(obj2.orange); //2
console.log(obj3.orange); //2
//---------------------------------------------------------------------------------------
//Must be in this format [[],[],[]] or
//I can use Object.entries(someObject) which will convert it to the needed format
let map = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);
console.log(map.get(1)); //num1
let obj = {
  name: "John",
  age: 30,
};
//Map from object
let map2 = new Map(Object.entries(obj));
console.log(map2.get("name")); // John
//---------------------------------------------------------------------------------------
// Map is a collection of keyed data items, just like an Object.
// But the main difference is that Map allows (((keys of any type))).
let john = { name: "John" };
let john2 = { name: "John" };
// for every user, let's store their visits count
let visitsCountMap = new Map();
// john is the key for the map
visitsCountMap.set(john, 123);
//DONOT map[key]
//Although map[key] also works, e.g. we can set map[key] = 2, this is treating
// map as a plain JavaScript object,so it implies all corresponding limitations
// (only string/symbol keys and so on).
visitsCountMap[john2] = 123;
console.log(visitsCountMap.get(john)); // 123
console.log(visitsCountMap.get(john2)); // undefined
