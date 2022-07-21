//The global object provides variables and functions that are available anywhere.
//By default, those that are built into the language or the environment
//In a browser it is named window, for Node.js it is global, for other environments it may have another name.
//Recently, the globalThis was added to the language, as a standardized name for a global object
//That includes JavaScript built-ins, such as Array and environment-specific values, 
//such as window.innerHeight – the window height in the browser.
//-------------
// All properties of the global object can be accessed directly
globalThis.console.log("kak"); //kak
console.log("kak"); //kak
//-------------
// In a browser,unless we’re using modules, global functions and variables 
//declared with var (not let/const!) become the property of the global object
//------------
// If a value is so important that you’d like to make it available globally, write it directly as a property
// using global variables is generally discouraged. There should be as few global variables as possible
globalThis.currentUser = {
  name: "kak",
};
console.log(currentUser.name);
console.log(globalThis.currentUser.name);
//----------------
//NOTE We use the global object to test for support of modern language features.(polyfills)
if (!globalThis.Promise) {
  // window.Promise = ... // custom implementation of the modern language feature (polyfill)
}
