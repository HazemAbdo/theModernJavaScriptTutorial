// As our application grows bigger, we want to split it into multiple files, so called “modules”.
// A module may contain a class or a library of functions for a specific purpose.
//---------------
//Modules can load each other and use special directives export and import to interchange functionality,
//call functions of one module from another one
//---------------
//As modules support special keywords and features, we must tell the browser that a script should be
//treated as a module,by using the //* attribute <script type="module">.
//---------------
// Modules work only via HTTP(s), not locally
//---------------
//core modules features:
//1.Modules always work in strict mode.
/* <script type="module">
  a = 5; //! error
</script> */
//2.Each module has its own top-level scope.
// In other words, top-level variables and functions from a module are not seen in other
// scripts.Modules should export what they want to be accessible from outside and import what they need.
// 📁 index.html
// <!doctype html>
// <script type="module" src="user.js"></script>
// <script type="module" src="hello.js"></script>
// 📁 user.js
// let user = "John";
// 📁 hello.js
// alert(user); //! no such variable (each module has independent variables)
//3.A module code is evaluated only the first time when imported
// 📁 alert.js
// alert("Module is evaluated!");
// 📁 1.js
// import `./alert.js`; // Module is evaluated!
// 📁 2.js
// import `./alert.js`; // (shows nothing)
// Such behavior is actually very convenient, because it allows us to //* configure modules.
// 📁 admin.js
// export let config = {};
// export function sayHi() {
//   alert(`Ready to serve, ${config.user}!`);
// }
//------------------
// 📁 init.js
// import { config } from "./admin.js";
// config.user = "Pete"; //* in the first import we init the module then other imports can use it
//------------------
// 📁 another.js
// import { sayHi } from "./admin.js";
// sayHi(); // Ready to serve, //* Pete!
//4.In a module, “this” is undefined
/* <script>
  alert(this); //* window
</script>

<script type="module">
  alert(this); //! undefined
</script> */