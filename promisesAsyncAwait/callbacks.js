//That’s called a //* “callback-based” style of asynchronous programming.
//A function that does something asynchronously should provide a callback
//argument where we put the function to run after it’s complete.
//-----------------------------
// loadScript("/my/script.js", function (script) {
//   alert(`Cool, the ${script.src} is loaded, let's load one more`);
//   loadScript("/my/script2.js", function (script) {
//     alert(`Cool, the second script is loaded`);
//   });
//   loadScript("/my/script3.js", function (script) {
//     alert(`Cool, the third script is loaded`);
//   });
//   ....
// });
//-----------------------------
//to handle errors we will use //* “error-first callback” style.
//first argument is the error if there was an error, otherwise null.
//second argument and so on are for the successful result
// function loadScript(src, callback) {
//   let script = document.createElement("script");
//   script.src = src;
//   script.onload = () => callback(null, script);
//   script.onerror = () => callback(new Error(`Script load error for ${src}`));
//   document.head.append(script);
// }
//-----------------------------
//! “callback hell” or “pyramid of doom.”
//The “pyramid” of nested calls grows to the right with every asynchronous action.
//Soon it spirals out of control.
// loadScript("1.js", function (error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript("2.js", function (error, script) {
//       if (error) {
//         handleError(error);
//       } else {
//         // ...
//         loadScript("3.js", function (error, script) {
//           if (error) {
//             handleError(error);
//           } else {
//             // ...continue after all scripts are loaded (*)
//           }
//         });
//       }
//     });
//   }
// });
