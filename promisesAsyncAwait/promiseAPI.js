"use strict";
//There are 6 ((static)) methods in the Promise class.
//----------------------------------------------------
//* 1-Promise.all
//many promises to execute in parallel and wait until all of them are ready
//let promise = Promise.all(iterable); iterable-->(usually, an array of promises)
//The new promise resolves when //! all listed promises are resolved,
//and the array of their results becomes its result.
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  4, //if any of those objects is not a promise, it’s passed to the resulting array “as is”.
]).then(console.log); //1,2,3,4 //the order is the same as in its source promises
//real life example
// let names = ["iliakan", "remy", "jeresig"];
// let requests = names.map((name) =>
//   fetch(`https://api.github.com/users/${name}`)
// );
// Promise.all(requests) // all responses are resolved successfully
//   .then((responses) => {
//     for (let response of responses) {
//       alert(`${response.url}: ${response.status}`); // shows 200 for every url
//     }
//     return responses;
//   })

//   .then((responses) => Promise.all(responses.map((r) => r.json()))) // map array of responses into an array of response.json() to read their content
//   .then((users) => users.forEach((user) => alert(user.name))); // all JSON answers are parsed: "users" is the array of them
//----------------------------------------------------
//* 2-Promise.allSettled
//let promise = Promise.allSettled(iterable); iterable-->(usually, an array of promises)
// Promise.allSettled just waits for //! all promises to settle, regardless of the result.
// The resulting array has:
// {status:"fulfilled", value:result} for successful responses,
// {status:"rejected", reason:error} for errors.
//----------------------------------------------------
//* 3-Promise.race
// let promise = Promise.race(iterable);
// waits only for the //! first settled promise and gets its result (or error).
//----------------------------------------------------
//* 4-Promise.any
// let promise = Promise.any(iterable);
//waits only for the //! first fulfilled promise and gets its result.
//If all are rejected, then the returned promise is rejected with //* AggregateError
//– a special error object that stores all promise errors in its errors property
//----------------------------------------------------
//* 5-Promise.resolve(value)
// Promise.resolve(value) //! creates a resolved promise with the result value.
//* 6-Promise.reject(error)
// Promise.reject(error) //! creates a rejected promise with error.
