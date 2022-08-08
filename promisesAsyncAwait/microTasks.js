//((Asynchronous)) tasks need proper management. For that, the ECMA standard specifies
//* an internal queue PromiseJobs, more often referred to as the “microtask queue” (V8 term).
//As stated in the specification:
//The queue is first-in-first-out: tasks enqueued first are run first.
//Execution of a task is initiated only when //! nothing else is running.
let promise = Promise.resolve();
//code finished
//promise done!
promise.then(() => console.log("promise done!"));
console.log("code finished");
//if we want promise done! first then just push the second console.log in the //* queue
//promise done!
//code finished
promise
  .then(() => console.log("promise done!"))
  .then(() => console.log("code finished"));
//--------------------------------------------------------------------------------
//unhandled rejection
// An “unhandled rejection” occurs when a //! promise error is not handled at the end of the microtask queue.
//-----
//result:
//caught
// let promise = Promise.reject(new Error("Promise Failed!"));
// promise.catch((err) => alert("caught"));
// window.addEventListener("unhandledrejection", (event) => alert(event.reason));
//-----
//result:
//Error: Promise Failed!
// let promise = Promise.reject(new Error("Promise Failed!"));
// window.addEventListener('unhandledrejection', event => alert(event.reason));
//------
//result:
//Error: Promise Failed!
//caught
//as before the setTimeout finish the error is not handled yet so we show the error
//let promise = Promise.reject(new Error("Promise Failed!"));
//setTimeout(() => promise.catch((err) => alert("caught")), 1000);
//window.addEventListener("unhandledrejection", (event) => alert(event.reason));
