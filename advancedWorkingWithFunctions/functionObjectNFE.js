//functions are objects.A good way to imagine functions is as callable action objects.
//We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.
//1.The “name” property
function sayHi() {
  console.log("Hi");
}

console.log(sayHi.name); // sayHi
//-----------
let sayHi2 = function () {
  console.log("Hi");
};
console.log(sayHi2.name); // sayHi2 (there's a name!)
//how it has a name??-->contextual name. If the function does not provide one, then in an assignment it is figured out from the context.
//-----------
// function created inside array
let arr = [function () {}];
console.log(arr[0].name); //empty string-->there’s no way to figure out the right name
//-----------
//2.The “length” property
//number of parameters of the function but rest parameters are not counted
function ask(question, ...handlers) {
  let isYes = confirm(question);
  //based on the # of parameters of handler we take the right action
  //This is a particular case of so-called polymorphism –treating arguments differently depending on their type
  // or, in our case depending on the length
  for (let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
//-----------
//3.custom properties
//We can also add properties of our own
function sayHi() {
  console.log("Hi");
  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 0; // initial value
//does not define a local variable counter inside it sayHi.count=0 !== let count=0
sayHi(); // Hi
sayHi(); // Hi
console.log(`Called ${sayHi.counter} times`); // Called 2 times
//-----------
//Function properties can replace closures sometimes
function makeCounter() {
  // instead of:
  // let count = 0
  function counter() {
    return counter.count++;
  }
  counter.count = 0;
  return counter;
}

let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1
//can't make count=10
//but can
counter.count = 10;
console.log(counter()); // 10
console.log(counter()); // 11
//-----------
//4. Named functions expressions (NFE)
//Function Expressions that have a name
//ordinary function expressions are anonymous functions
let sayHi3 = function (who) {
  console.log(`Hello, ${who}`);
};
//-----------
//NFE has a name ((func))
let sayHi4 = function func(who) {
  console.log(`Hello, ${who}`);
};
//There are two special things about the name func, that are the reasons for it:
//It allows the function to reference itself internally.
//It is not visible outside of the function.
//func is an “internal function name”, the way for the function to can call itself reliably.
//Sometimes, when we need a reliable internal name, it’s the reason to rewrite a Function
//Declaration to Named Function Expression form.
let sayHi5 = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};
sayHi5(); // Hello, Guest
// func(); // But this won't work: // Error, func is not defined
//-----------
//DONOT one can said we can use the variable to recall the function like this:
let sayHi6 = function (who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHi6("Guest");
  }
};
sayHi6(); // Hello, Guest
//the problem is that
let sayHi7 = sayHi6;
sayHi6 = null;
// sayHi7(); //Uncaught TypeError TypeError: sayHi6 is not a function
//------------------------------------------------------------
function makeCounter2() {
  // instead of:
  // let count = 0
  function counter() {
    return counter.count++;
  }
  counter.count = 0;
  counter.set = function (value) {
    counter.count = value;
  };
  counter.decrease = function () {
    counter.count--;
  };
  return counter;
}
let counter2 = makeCounter2();
counter2.set(10);
console.log(counter2.count); //10
counter2();
console.log(counter2.count); //11
counter2.decrease();
counter2.decrease();
counter2.decrease();
console.log(counter2.count); //8
//------------------------------------------------------------
console.log(sum(1)(2));
console.log(sum(1)(2)(3));
console.log(sum(5)(-1)(2));
console.log(sum(6)(-1)(-2)(-3));
console.log(sum(0)(1)(2)(3)(4)(5));
function sum(a) {
  sum.current = (sum.current ?? 0) + a;
  sum.toString = () => sum.current;
  return sum;
}
