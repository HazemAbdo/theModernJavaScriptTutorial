// "use strict";
// try {
//   setTimeout(function () {
//     noSuchVariable; // script will die here
//   }, 1000);
// } catch (err) {
//   console.log("won't work");
// }
// //--------Vs---------
// setTimeout(function () {
//   try {
//     noSuchVariable; // try...catch handles the error!
//   } catch {
//     console.log("error is caught here!");
//   }
// }, 1000);
// //--------------------------------------------------------------
// try {
//   lalala; // error, variable is not defined!
// } catch (err) {
//   console.log(err.name); // ReferenceError
//   console.log(err.message); // lalala is not defined
//   console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
//   // Can also show an error as a whole
//   // The error is converted to string as "name: message"
//   console.log(err); // ReferenceError: lalala is not defined
// }
// //--------------------------------------------------------------
// //real life example
// let json = "{ bad json }";
// try {
//   let user = JSON.parse(json); // <-- when an error occurs...
//   console.log(user.name); // doesn't work
// } catch (err) {
//   // ...the execution jumps here
//   console.log(
//     "Our apologies, the data has errors, we'll try to request it one more time."
//   );
//   console.log(err.message);
//   //Here we use the catch block only to show the message, but we can do much more: send a new network
//   //request, suggest an alternative to the visitor,send information about the error to a logging facility
// }
// //--------------------------------------------------------------
// //make our errors
// let json2 = '{ "age": 30 }'; // parse will work well but the age must be single quoted 'name'
// try {
//   let user = JSON.parse(json2); // <-- no errors
//   if (!user.name) {
//     //* throw new errorName(errorMsg)
//     //there are built in errors constructors
//     //  new Error(message);
//     //  new SyntaxError(message);
//     //  new ReferenceError(message);
//     throw new SyntaxError("Incomplete data: no name"); // (*)
//   }
//   console.log(user.name);
// } catch (err) {
//   console.log("JSON Error: " + err.message); // JSON Error: Incomplete data: no name
// }
// //--------------------------------------------------------------
// //! The rule is simple: Catch should only process errors that it knows and “rethrow” all others.
// //Catch gets all errors.
// //In the catch (err) {...} block we analyze the error object err.
// //If we don’t know how to handle it, we do throw err.
// let json3 = '{"age": 30 }';
// try {
//   let user = JSON.parse(json3);
//   blabla(); // unexpected error
//   if (!user.name) {
//     throw new SyntaxError("Incomplete data: no name");
//   }
//   console.log(user.name);
// } catch (err) {
//   //this catch is made to handle JSON.parse error only
//   //so any other error will be handled by //* rethrowing a new error
//   if (err instanceof SyntaxError) {
//     console.log("JSON Error: " + err.message);
//   } else {
//     throw err; // rethrow (*)
//   }
// }
//--------------------------------------------------------------
// //finally:If it exists, it runs in all cases:
// //after try, if there were no errors,
// //after catch, if there were errors.
// let num = -10;
// //35---> 9227465         execution took 175ms
// //! 0---->error occurred   execution took 0ms
// let diff, result;
// function fib(n) {
//   if (n < 0 || Math.trunc(n) != n) {
//     throw new Error("Must not be negative, and also an integer.");
//   }
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }
// let start = Date.now();
// try {
//   result = fib(num);
// } catch (err) {
//   result = 0;
// } finally {
//   //Here finally guarantees that the time will be measured correctly in both situations
//   //– in case of a successful execution of fib and in case of an error in it:
//   diff = Date.now() - start;
// }
// console.log(result || "error occurred");
// console.log(`execution took ${diff}ms`);
//-------------------
// The finally clause works for any exit from try...catch. That includes an //* explicit return.
function func() {
  try {
    return 1;
  } catch (err) {
    /* ... */
  } finally {
    console.log("finally");
  }
}
//! first works console.log from finally, and then this one
console.log(func()); //finally 1
//-----------------------------------------------TASKS----------------------------------------------------
//We definitely need the cleanup after the work, doesn’t matter if //? there was an error or not.
//Is there an advantage here in using finally or both code fragments are equal? If there is such an advantage,
//then give an example when it matters.
//fragment1
// try {
//     work work
//   } catch (err) {
//     handle errors
//   } finally {
//     cleanup the working space
//   }
//------------------
//fragment2
//   try {
//     work work
//   } catch (err) {
//     handle errors
//   }
//   cleanup the working space

//in case of there was //* return inside catch or in case of an error had been thrown
//in both cases only finally will make the cleanup process
