"use strict";
//When we develop something, we often need our own error classes to reflect
//specific things that may go wrong in our tasks. For errors in network operations we may need HttpError,
//for database operations DbError, for searching operations NotFoundError and so on.
//Our errors should support basic error properties like message, name and, preferably, stack.
//But they also may have other properties of their own, e.g. HttpError objects may have
//a statusCode property with a value like 404 or 403 or 500.
//It is better to inherit from Error, then it becomes possible to use
//* obj instanceof Error to identify error objects.
// class MyError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = this.constructor.name;
//   }
// }
// class ValidationError extends MyError {}
// class PropertyRequiredError extends ValidationError {
//   constructor(property) {
//     super("No property: " + property);
//     this.property = property;
//   }
// }
//---------------
// Usage
// function readUser(json) {
//   let user = JSON.parse(json);
//   if (!user.age) {
//     throw new PropertyRequiredError("age");
//   }
//   if (!user.name) {
//     throw new PropertyRequiredError("name");
//   }
//   return user;
// }
// Working example with try..catch
// try {
//   let user = readUser('{ "age": 25 }');
// } catch (err) {
//   if (err instanceof ValidationError) {
//     console.log("Invalid data: " + err.message); // Invalid data: No property: name
//     console.log(err.name); // PropertyRequiredError
//     console.log(err.property); // name
//   } else if (err instanceof SyntaxError) {
//     console.log("JSON Syntax Error: " + err.message);
//   } else {
//     throw err; // unknown error, rethrow it
//   }
//? what if we have 30 type of errors is it a good practice to have 30 if else(*)
// }
//---------------------------------------------------------------------------------
//* wrapping exceptions are the solution (*)
//Wrapping exceptions is a widespread technique: a function handles low-level exceptions
//and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes
//become properties of that object like err.cause in the examples above, but that’s not strictly required.
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}
class ValidationError extends Error {
  /*...*/
}
class PropertyRequiredError extends ValidationError {
  /* ... */
}
//------------------------------------------
function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}
//------------------------------------------
function readUser(json) {
  let user;
  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}
//------------------------------------------
try {
  //Then the code that calls readUser will only have to check for ReadError,
  //not for every kind of data reading errors.
  //And if it needs more details of an error, it can check its cause property.
  readUser("{bad json}");
} catch (e) {
  if (e instanceof ReadError) {
    console.log(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    console.log("Original error: " + e.cause);
  } else {
    throw e;
  }
}
//---------------------------------------------------------TASKS------------------------------------------
//?Create a class FormatError that inherits from the built-in SyntaxError class.
//?It should support message, name and stack properties.
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
let err = new FormatError("formatting error");
console.log(err.message); // formatting error
console.log(err.name); // FormatError
// console.log(err.stack); // stack
console.log(err instanceof FormatError); // true
console.log(err instanceof SyntaxError); // true (because inherits from SyntaxError)
