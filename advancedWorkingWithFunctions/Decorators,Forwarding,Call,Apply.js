function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}
function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x);
    cache.set(x, result);
    return result;
  };
}
console.log(slow(1)); // slow(1) is cached and the result returned
console.log("Again: " + slow(1)); // slow(1) result returned from cache
console.log(slow(2)); // slow(2) is cached and the result returned
console.log("Again: " + slow(2)); // slow(2) result returned from cache
//-------------------------------------------------------------------------------
// we'll make worker.slow caching
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // scary CPU-heavy task here
    console.log("Called with " + x);
    console.log(this); //without call it is the global object //after call it is worker
    return x * this.someMethod(); // (*)
  },
};
function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    //So, the wrapper passes the call to the original method,
    //but without the context this. Hence the error
    //DONOT
    // let result = func(x); // (*)
    //DO
    let result = func.call(this, x);
    cache.set(x, result);
    return result;
  };
}
console.log(worker.slow(1)); // the original method works
worker.slow = cachingDecorator(worker.slow); // now make it caching
//when not using call Whoops! Error: Cannot read property 'someMethod' of undefined
console.log(worker.slow(2));
//-------------------------------------------------------------------------------
//what if slow is multi-argument
let worker2 = {
  slow(...args) {
    console.log("Called with " + args);
    return args.reduce((acc, arg) => acc + arg, 0); // (*)
  },
};
function cachingDecoratorMultiArg(func, hash) {
  let cache = new Map();
  return function () {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }
    //So, the wrapper passes the call to the original method,
    //but without the context this. Hence the error
    //DONOT
    // let result = func(x); // (*)
    //-------
    //apply-->array-like object  vs call-->list of arguments
    // apply will probably be faster, because most JavaScript engines internally optimize it better
    //DO
    // let result = func.call(this, ...arguments);
    //DO another way
    let result = func.apply(this, arguments);
    //-------
    cache.set(key, result);
    return result;
  };
}
function hash(args) {
  //why not use array.join()
  //Unfortunately, that won’t work. As arguments object is both iterable and array-like, but not a real array
  //DONOT
  //return args.join("");//Uncaught TypeError TypeError: args.join is not a function
  //Still I want to use join()
  //NOTE Method borrowing
  //We take (borrow) a join method from a regular array ([].join)
  //and use [].join.call to run it in the context of arguments
  return [].join.call(args);
}
worker2.slow = cachingDecoratorMultiArg(worker2.slow, hash);
console.log(worker2.slow(3, 5, 7)); // works
console.log("Again " + worker2.slow(3, 5, 7)); // same (cached)
// //-------------------------------------------Tasks--------------------------------------------------------

function work(a, b) {
  console.log(a + b); // work is an arbitrary function or method
}
work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log("call:" + args.join()); // "call:1,2", "call:4,5"
}
//decorator
function spy(func) {
  //wrapper
  wrapper.calls = [];
  function wrapper(...args) {
    //original function
    wrapper.calls.push(args);
    func.apply(this, args);
  }
  return wrapper;
}
// //-------------------------------
function f(x) {
  console.log(x);
}
// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 3000);
f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms

function delay(func, delay) {
  function wrapper(...args) {
    setTimeout(() => func.apply(this, args), delay);
  }
  return wrapper;
}
//-----------------------------------------
let f2 = debounce(console.log, 1000);
f2("a");
setTimeout(() => f2("b"), 200);
setTimeout(() => f2("c"), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")
function debounce(func, coolDownPeriod) {
  let timer;
  function wrapper(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), coolDownPeriod);
  }
  return wrapper;
}
//----------------------------------------------
function f3(a) {
  console.log(a);
}
// f1001 passes calls to f at maximum once per 1000 ms
let f1001 = throttle(f3, 1000);
f1001(1); // shows 1
f1001(2); // (throttling, 1000ms not out yet)
f1001(3); // (throttling, 1000ms not out yet)
// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;
    func.apply(this, arguments); // (1)
    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
