"use strict";
//When a promise rejects, the control jumps to the closest rejection handler(.catch)
//-----------------
//The code of a promise ((executor)) and promise ((handlers)) has an //* "invisible try..catch" around it.
//If an //* exception happens, it gets caught and treated as a rejection.
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    blabla(); // no such function
  })
  .catch(alert); // ReferenceError: blabla is not defined
//-----------------
//If we throw inside .catch, then the control goes to the next closest error handler.
// the execution: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    // (*)
    if (error instanceof URIError) {
      // handle it
    } else {
      alert("Can't handle such error");
      throw error; // throwing this or another error jumps to the next catch
    }
  })
  .then(function () {
    /* doesn't run here */
  })
  .catch((error) => {
    // (**)
    alert(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
  });
//And if we handle the error and finish normally, then it continues to the next closest successful .then
// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("The error is handled, continue normally");
  })
  .then(() => alert("Next successful handler runs"));
//-----------------
//In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection
//handler. //! But there is none. So the error gets “stuck”. There’s no code to handle it.
//-----------------
//If an error occurs, and there’s no .catch, the //* unhandledrejection handler triggers,
//and gets the event object with the information about the error, so we can do something.
window.addEventListener("unhandledrejection", function (event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});
new Promise(function () {
  throw new Error("Whoops!");
}); // no catch to handle the error
//----------------------------------------------------TASKS------------------------------------------------------
// Now the question is when does promise is consider rejected?
//--------------------------------------------------------------
// case 1)The executer function is having synchronous code.any error("exception") occurred here OR
// any error thrown explicitly here OR call to reject function the promise is rejected
//---------------
// case 2) The executer function is having some async code.
// if INSIDE the async code (ex setTimeout),you throw / or get any error it won't cause promise to be rejected.
//! if you want to reject the promise from inside async code, you need to call reject method .
