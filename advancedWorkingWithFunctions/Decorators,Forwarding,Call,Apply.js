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
    //DO
    let result = func.call(this, ...arguments);
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
