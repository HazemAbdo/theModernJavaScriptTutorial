// import everything as an object using import * as <obj> //! not recommended
//------------------------------------------------------------------------------
//Named   : export class User {...}--->import {User} from ...
//Default : export default class User {...}--->import User from ...
//------------------------------------------------------------------------------
// * Named exports force us to use exactly the right name to import
//----
// ! While for a default export, we always choose the name when importing
// ! So team members may use different names to import the same thing, and that’s not good.
// Usually, to avoid that and keep the code consistent, there’s a rule that imported variables
// should correspond to file names, e.g:
// import User from './user.js';
// import LoginForm from './loginForm.js';
//------------------------------------------------------------------------------------------------
//Re-exporting
//*  “Re-export” syntax export ... from ... allows to import things and immediately export them
//?Why would that be needed? Let’s see a practical use case.
// Imagine, we’re writing a “package”: a folder with a lot of modules
//this is our file structure:
// auth/
//     index.js
//     user.js
//     helpers.js
//     tests/
//         login.js
//     providers/
//         github.js
//         facebook.js
//         ...
//We’d like to expose the package functionality via a //* single entry point
// a person who would like to use our package, should import only from the “main file” auth/index.js.
// import {login, logout} from 'auth/index.js'
// 📁 auth/index.jsx
//longer approach:
// import {login, logout} from './helpers.js';
// export {login, logout};
//------
// 📁 auth/index.jsx
// shorter approach:
// export {login, logout} from './helpers.js';
// export {default as User} from './user.js';
//The notable difference of export ... from compared to import/export is that
// ! re-exported modules aren’t available in the current file.
//------------------------
//? a problem in re-exporting the default
//Such oddities of re-exporting a default export are one of the reasons why some developers
//* don’t like default exports and prefer named ones.
// export User from './user.js'; //!error
//--------------
// export * from './user.js';//! will only export named exports
//--------------
// export * from './user.js'; // to re-export named exports
// export {default} from './user.js'; // to re-export the default export
//------------------------------------------------------------------------------------------------
// Please note that import/export statements don’t work if inside {...}.
// if (something) {
//   import { sayHi } from "./say.js"; // Error: import must be at top level
// }
//dynamic import for the rescue
