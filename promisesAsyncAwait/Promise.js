//! 1- A “producing code” (Executor)
//that does something and takes time. For instance, some code
//that loads the data over a network. That’s a “singer”.
//-------
//! 2-A “consuming code”
//that wants the result of the “producing code” once it’s ready.
//Many functions may need that result. These are the “fans”.
//-------
// !3-A promise
//is a special JavaScript object that links the “producing code” and the
//“consuming code” together. In terms of our analogy: this is the “subscription list”.
//The “producing code” takes whatever time it needs to produce the promised result,
//and the “promise” makes that result available to all of the subscribed code when it’s ready.
//---------------------------------------------------
//The promise object returned by the new Promise constructor has these internal properties:
//* state
//initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
//*result
// initially undefined, then changes to value when resolve(value) called or error when reject(error) is called.
new Promise(function (resolve, reject) {
  resolve("done");
  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
})
  //---------------------------------------------------
  //* .then(onFulfilled, onRejected)
  .then(
    function (result) {
      /* handle a successful result */
    },
    function (error) {
      /* handle an error */
    }
  );
//------------------------
//If we’re interested only in errors,.then(null, errorHandlingFunction).
//Or we can use //* .catch(errorHandlingFunction)
new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
}).catch(console.log); // shows "Error: Whoops!" after 1 second
//----------------------------
//* .finally(onFinally)
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => {})
  // so the loading indicator is always stopped before we go on
  .then(
    (result) => {},
    (err) => {}
  );
//---------------------------------------TASKS-----------------------------------------------------
let promise = new Promise(function (resolve, reject) {
  resolve(1);
  setTimeout(() => resolve(2), 1000);
});
promise.then(console.log); //?The output is? --> 1.
//The second call to resolve is ignored, because only the first call of
//reject/resolve is taken into account. Further calls are ignored.
//----------------------------------------------------
//? The built-in function setTimeout uses callbacks. Create a promise-based alternative.
function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}
delay(3000).then(() => console.log("runs after 3 seconds"));
//---------------------------------------------------
//Rewrite the showCircle function in the solution of the task Animated circle
//with callback so that it returns a promise instead of accepting a callback.
function showCircleWithPromises(cx, cy, radius) {
  return new Promise((resolve) => {
    let div = document.createElement("div");
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + "px";
    div.style.top = cy + "px";
    div.className = "circle";
    document.body.append(div);
    setTimeout(() => {
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";
      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 0);
  });
}
showCircle(150, 150, 100).then((div) => {
  div.classList.add("message-ball");
  div.append("Hello, world!");
});
