"use strict";
//NOTE let bound = func.bind(context, [arg1], [arg2], ...);
let user = {
  firstName: "John",
  sayHi() {
    //in case of user.sayHi//(timer object)Timeout {_idleTimeout: 1000, _idlePrev: null, _idleNext: null, _idleStart: 316, _onTimeout: ƒ, …}
    console.log(this);
    console.log(`Hello, ${this.firstName}!`);
  },
};
setTimeout(user.sayHi, 1000); // Hello, undefined!
//1. first solution using wrapper function
setTimeout(function () {
  //Now it works, because it receives user from the outer
  // lexical environment, and then calls the method normally
  user.sayHi(); //Hello, John!
}, 1000);
//shorter alternative
// Looks fine, but a slight vulnerability appears in our code structure.
// What if before setTimeout triggers (there’s one second delay!)
// user changes value? Then, suddenly, it will call the wrong object!
setTimeout(() => user.sayHi(), 1000);
let user2 = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};
setTimeout(() => user2.sayHi(), 1000); //Another user in setTimeout!
// ...the value of user changes within 1 second
user2 = {
  sayHi() {
    console.log("Another user in setTimeout!");
  },
};
//2. second solution using bind function
let user3 = {
  firstName: "John",
};
function func() {
  console.log("user3", this.firstName);
}
// Here func.bind(user) as a “bound variant” of func with fixed this=user
let funcUser = func.bind(user3);
funcUser(); //user3 John
//-----------------with object methods----------------
let user4 = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};
let sayHi = user4.sayHi.bind(user4); // (*)
// can run it without an object
sayHi(); // Hello, John!
setTimeout(sayHi, 1000); // Hello, John!
// even if the value of user4 changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user4 object
user4 = {
  sayHi() {
    console.log("Another user4 in setTimeout!");
  },
};
//-----------------bindAll----------------
//If an object has many methods and we plan to actively pass it around,
//then we could bind them all in a loop:
for (let key in user) {
  if (typeof user[key] == "function") {
    user[key] = user[key].bind(user);
  }
}
//3.Partial function(application in which we can use bind)
// In other cases, partial application is useful when we have a very generic function
//  and want a less universal variant of it for convenience.
// For instance, we have a function send(from, to, text).
// Then, inside a user object we may want to use a partial variant
// of it: sendTo(to, text) that sends from the current user
function mul(a, b) {
  return a * b;
}
//The call to mul.bind(null, 2) creates a new function double that passes
//calls to mul, fixing null as the context and 2 as the first argument.
//Further arguments are passed as is
let double = mul.bind(null, 2);
console.log(double(3)); //6
console.log(double(4)); //8
console.log(double(5)); //10
//---------------passing null as context will not work in case of methods------------
// What if we’d like to fix some arguments, but not the context this?
// For example, for an object method.The native bind does not allow that.
// We can’t just omit the context and jump to arguments.
function partial(func, ...args) {
  return function (...moreArgs) {
    return func.call(this, ...args, ...moreArgs);
  };
}
// Usage:
let user5 = {
  firstName: "John",
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};
// add a partial method with fixed time
user5.sayNow = partial(
  user5.say,
  new Date().getHours() + ":" + new Date().getMinutes()
);
user5.sayNow("Hello"); // [10:00] John: Hello!
//-------------------------Tasks-----------------------------------------
function f() {
  //The context of a bound function is hard-fixed.
  //There’s just no way to further change it.
  console.log(this); // ?-->the answer is null
}
let user6 = {
  name: "user6",
  g: f.bind(null),
};
// user6.g.bind(user6); //even if we do that it is hard-fixed
user6.g();
//-------------------------------------------------------------------
function f2() {
  console.log(this.name); //?--> //John//A function cannot be re-bound.
}
f2 = f2.bind({ name: "John" }).bind({ name: "Ann" });
f2();
//-------------------------------------------------------------------
function sayHi2() {
  console.log(this.name);
}
sayHi2.test = 5;
let bound = sayHi2;
console.log(bound.test); // ?-->5
let bound2 = sayHi2.bind({ name: "john" });
//The result of bind is another object. It does not have the test property.
console.log(bound2.test); // ?-->Undefined
//-------------------------------------------------------------------
function askPassword(ok, fail) {
  let password = "kak";
  if (password == "rockstar") ok();
  else fail();
}
let user7 = {
  name: "John",
  loginOk() {
    console.log(`${this.name} logged in`);
  },
  loginFail() {
    console.log(`${this.name} failed to log in`);
  },
};
//DONOT
// askPassword(user7.loginOk, user7.loginFail);//Cannot read property 'name' of undefined
//------------
//John failed to log in
//DO
askPassword(user7.loginOk.bind(user7), user7.loginFail.bind(user7));
// An alternative solution could be:
//DO but It’s a bit less reliable though in more complex situations
//where user variable might change after askPassword is called,
//but before the visitor answers and calls () => user.loginOk()
// askPassword(
//   () => user7.loginOk(),
//   () => user7.loginFail()
// );
//-------------------------------------------------------------------
//The user object was modified. Now instead of two functions loginOk/loginFail,
//it has a single function user.login(true/false)
function askPassword2(ok2, fail2) {
  let password = "kak";
  if (password == "rockstar") ok2();
  else fail2();
}
let user8 = {
  name: "John",
  login(result) {
    console.log(this.name + (result ? " logged in" : " failed to log in"));
  },
};
askPassword(user8.login.bind(user8, true), user8.login.bind(user8, false));
