//static imports have two limitations:
//1.The module path must be a primitive string, can’t be a function call. This won’t work:
// import ... from getModuleName(); // Error, only from "string" is allowed
//2.Second, we can’t import conditionally or at run-time:
// if(...) {
//     import ...; // Error, not allowed!
//   }
//   {
//     import ...; // Error, we can't put import in any block
//   }
//------------------------------------------------------------------------------------------------
//Dynamic imports for the rescue
// Dynamic imports work in regular scripts, they don’t require script type="module".
// * The import() expression
//The import(module) expression loads the module and returns a ((promise)) that resolves 
//import() is not a function
//into a module object that contains all its exports. 
//e.g
// let modulePath = prompt("Which module to load?");
// import(modulePath)
//   .then(obj => <module object>)
//   .catch(err => <loading error, e.g. if no such module>)
//or except using .then/.catch we can use await
//e.g
// 📁 say.js
// export function hi() {
//     alert(`Hello`);
//   }
//   export function bye() {
//     alert(`Bye`);
//   }
// 📁 index.js
// let {hi, bye} = await import('./say.js');
// hi();
// bye();