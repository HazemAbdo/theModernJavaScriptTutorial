// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
  //? We can add a special static getter Symbol.species(*)
  //   static get [Symbol.species]() {
  //     return Array;
  //   }
}
let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false
//Please note a very interesting thing. Built-in methods like filter,
//map and others – //* return new objects of exactly the inherited type PowerArray
//! filteredArr is of type PowerArray not Array
//?But what if we want to return the constructor that JavaScript will use internally -->Array(*)
let filteredArr = arr.filter((item) => item >= 10);
console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false //after adding Symbol.species-->Error
//----------------------------------------------------------
// But built-in classes are an exception. //! They don’t inherit statics from each other.
//For example, both Array and Date inherit from Object, so their instances
//have methods from Object.prototype. But Array.[[Prototype]] does not reference Object,
//so there’s //! no Array.keys() (or Date.keys()) static method
