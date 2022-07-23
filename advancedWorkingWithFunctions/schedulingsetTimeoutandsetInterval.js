//We may decide to execute a function not right now, but at a certain time later-->“scheduling a call”
//setTimeout-->once setInterval-->repeatedly
//let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
//let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
//func-->reference to function or it's code or a string code
//delay in ms-->1000ms=1s
//arg1,arg2,... arguments will be passed to the func
function sayHi(phrase, who) {
  console.log(phrase + ", " + who);
}
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
//DONOT Pass a function, but don’t run it
// setTimeout(sayHi(), 1000, "Hello", "John"); // Uncaught NodeError TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. Received undefined
//------
// setTimeout("console.log('Hello')", 1000);
//------
setTimeout(() => console.log("Hello"), 2000); //Hello
//--------------------------
//A call to setTimeout returns a “timer identifier” timerId that we can use to cancel the execution
// let timerId = setTimeout(...);
// clearTimeout(timerId);
//--------------------------
//In most browsers, including Chrome and Firefox the internal timer
//continues “ticking” while showing alert/confirm/prompt
//--------------------------------------------------
//Nested setTimeout vs setInterval:
//1-The nested-setTimeout is a more flexible method than setInterval can set different delay each time
//e.g For instance, we need to write a service that sends a request to theServer every 5
//seconds asking for data, but in case  theServer is overloaded,it should increase the interval to 10, 20, 40 seconds…
// let delay = 5000;
// let timerId = setTimeout(function request() { 
//   ...send request...
//   if (request failed due to serveroverload) {
//     // increase the interval to the next run
//     delay *= 2;
//   }
//   timerId = setTimeout(request, delay);
// }, delay);
//2-Nested setTimeout allows to set the delay between the executions more precisely than setInterval
//The real delay between func calls for setInterval is less than in the code!
//That’s normal, because the
//In the edge case, if the function always executes longer than delay ms, then the calls will happen without a pause at all
// let i = 1;
// setInterval(function () {
//   func(i++);
// }, 100);
//The nested setTimeout guarantees the fixed delay (here 100ms).
//That’s because a new call is planned at the end of the previous one
// let j = 1;
// setTimeout(function run() {
//   func(j++);
//   setTimeout(run, 100);
// }, 100);
//---------------------------------------------
//NOTE scheduling and garbage collection
//an internal reference is created to it and saved in the scheduler. It prevents the
//function from being garbage collected, even if there are no other references to it.
//There’s a side effect. A function references the outer lexical environment, so, while it lives,
//outer variables live too. They may take much more memory than the function itself.
//---------------------------------------------
//Zero delay setTimeout or setInterval-->setTimeout(func, 0), or just setTimeout(func)
//schedules the execution of func as soon as possible. But the scheduler will invoke it
//only after the currently executing script is complete
setTimeout(() => console.log("World"));
console.log("Hello");
//Hello
//world
//Zero delay is in fact not zero (in a browser)
//The HTML5 standard says: “after five nested timers, the interval is forced to be at least 4 milliseconds.”
let start = Date.now();
let times = [];
setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call
  if (start + 100 < Date.now())
    console.log(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});
// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
//First timers run immediately (just as written in the spec),and then we see 9, 15, 20, 24....
//The 4+ ms obligatory delay between invocations comes into play
//--------------------------------------------------Tasks-------------------------------------
//1.with setInterval
//first solution
function printNumbers(from, to) {
    let current = from;
    function go() {
      console.log(current);
      if (current == to) clearInterval(timerId);
      current++;
    }
    go(); //to make first call happens immediately
    let timerId = setInterval(go, 1000);
  }
  printNumbers(3, 5);
  //second solution
  // function printNumbers(from, to) {
  //   from += printNumbers.counter;
  //   if (from == to) {
  //     console.log(from);
  //     clearTimeout(timerId);
  //   } else {
  //     console.log(from);
  //   }
  //   printNumbers.counter++;
  // }
  // printNumbers.counter = 0;
  // let timerId = setInterval(printNumbers, 1000, 6, 10);
  
  //----------------------------------
  //2.with setTimeout
  //first solution
  function printNumbers(from, to) {
    let current = from;
    let timerId = setTimeout(function go() {
      console.log(current);
      if (current < to) {
        current++;
        timerId = setTimeout(go, 1000);
      } else {
        clearTimeout(timerId);
      }
    }, 1000);
  }
  printNumbers(3, 5);
  //second solution
  // let timerId2 = setTimeout(
  //   function printNumbers2(from, to) {
  //     if (from == to) {
  //       console.log(from);
  //       clearTimeout(timerId2);
  //     } else {
  //       console.log(from);
  //       from++;
  //       timerId2 = setTimeout(printNumbers2, 1000, from, to);
  //     }
  //   },
  //   1000,
  //   6,
  //   10
  // );
  //----------------------------------------------------------------
  // In the code below there’s a setTimeout call scheduled, then a heavy calculation is run, 
  // that takes more than 100ms to finish.When will the scheduled function run?
  // After the loop.-->answer
  // Before the loop.
  // In the beginning of the loop.
  // What is alert going to show?-->answer 100000000
  let i = 0;
  setTimeout(() => console.log(i), 100); // ?
  // assume that the time to execute this function is >100ms
  for (let j = 0; j < 100000000; j++) {
    i++;
  }
  
