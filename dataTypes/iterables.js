//we can use  Array.from() to make slice that supports surrogate pairs
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}
let str2 = '𝒳😂𩷶';
console.log( slice(str2, 1, 3) ); // 😂𩷶
// the native method does not support surrogate pairs
console.log( str2.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
//---------------------------------------------------------------------------------------
//surrogate pairs
let str = '𝒳😂';
//DONOT As split doesn't work well with surrogate pairs
let arr=str.split();//['𝒳😂']
console.log("arr", arr);
// takes an iterable or array-like value and makes a “real” Array from it
let arr2=Array.from(str);
console.log("arr2", arr2);//['𝒳', '😂']
let chars = []; 
for (let char of str) {
  chars.push(char);
}
console.log("chars", chars);//['𝒳', '😂']
//---------------------------------------------------------------------------------------
//1.Add Symbol.iterator method to the object iterable
//2.when for .. of starts it calls Symbol.iterator 
//3.Symbol.iterator returns an iterator(an object has next method)
//4.for..of now only works with the iterator object
//5.When for..of wants the next value, it calls next() on that object.
//6.The result of next() must have the form {done: Boolean, value: any}, 
//where done=true means that the loop is finished, 
//otherwise value is the next value.  
//---------------------------------second way------------------------------
//NOTE Now range[Symbol.iterator]() returns the range object itself
//The downside is that now it’s impossible to have two for..of 
//loops running over the object simultaneously
let range2 = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    //NOTE we make current and not directly work with from 
    //as we will increase it after each iteration so its value will not 
    //be 1(its real value) after the loop ends
    this.current = this.from;
    //NOTE return the range2 object itself
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range2) {
  console.log(num); // 1, then 2, 3, 4, 5
}
//---------------------------------First way------------------------------
//NOTE  the iterator object is separate from the object it iterates over
let range = {
  from: 1,
  to: 5,
};
// 1. call to for..of initially calls this
range[Symbol.iterator] = function () {
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking
  //it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};
// now it works!
for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}
