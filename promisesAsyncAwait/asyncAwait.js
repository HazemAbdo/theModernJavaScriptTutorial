//The word “async” before a function means one simple thing: a function //* always returns a promise.
//Other values are wrapped in a ((resolved)) promise automatically.
//--------
//The keyword await makes JavaScript //* wait until that promise ((settles)) and returns its result.
//await works only inside async functions
//Modern browsers allow top-level await in modules
//----------------------------------------------------
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // wait until the promise resolves (*)

  console.log(result); // "done!"
}
f();
//----------------------------------------------------
//real life example
// async function showAvatar() {
// read our JSON
//   let response = await fetch("/article/promise-chaining/user.json");
//   let user = await response.json();
// read github user
//   let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
//   let githubUser = await githubResponse.json();
// show the avatar
//   let img = document.createElement("img");
//   img.src = githubUser.avatar_url;
//   img.className = "promise-avatar-example";
//   document.body.append(img);
// wait 3 seconds
//   await new Promise((resolve, reject) => setTimeout(resolve, 3000));
//   img.remove();
//   return githubUser;
// }
// showAvatar();
//----------------------------------------------------
// To declare an async ((class method)), just prepend it with async
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}
new Waiter().wait().then(console.log);
//----------------------------------------------------
//error handling using //* try/catch
// async function f() {
//   try {
//     let response = await fetch("http://no-such-url");
//   } catch (err) {
//     alert(err); // TypeError: failed to fetch
//   }
// }
// f();
//--------
//if we don't have try catch we can use //* .catch()
// async function f() {
//     let response = await fetch('http://no-such-url');
//   }
//   // f() becomes a rejected promise
//   f().catch(alert); // TypeError: failed to fetch // (*)
//----------------------------------------------------
//async/await works well with //* Promise.all
// let results = await Promise.all([
//     fetch(url1),
//     fetch(url2),
//     ...
//   ]);
//----------------------------------------------------TASKS----------------------------------------------------
//?rewrite loadJson with async/await
// function loadJson(url) {
//   return fetch(url).then((response) => {
//     if (response.status == 200) {
//       return response.json();
//     } else {
//       throw new Error(response.status);
//     }
//   });
// }
// loadJson("https://javascript.info/no-such-user.json").catch(alert); // Error: 404
// //-----------------------
// async function loadJsonAsync(url) {
//   let response = await fetch(url);
//   if (response.status == 200) {
//     let json = await response.json();
//     return json;
//   } else {
//     throw new Error(response.status);
//   }
// }
// loadJsonAsync("https://javascript.info/no-such-user.json").catch(alert);
//--------------------------------------------------------------------------
//? Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.
//And get rid of the recursion in favour of a loop in demoGithubUser: with async/await
// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = "HttpError";
//     this.response = response;
//   }
// }
// async function loadJson(url) {
//   let response = await fetch(url);
//   alert(response.status);
//   if (response.status == 200) {
//     let json = await response.json();
//     return json;
//   } else {
//     throw new HttpError(response);
//   }
// }
// // Ask for a user name until github returns a valid user
// async function demoGithubUser() {
//   while (true) {
//     let name = prompt("Enter a name?", "iliakan");
//     try {
//       let user = await loadJson(`https://api.github.com/users/${name}`);
//       break;
//     } catch (err) {
//       if (err instanceof HttpError && err.response.status == 404) {
//         alert("No such user, please reenter.");
//         return demoGithubUser();
//       } else {
//         throw err;
//       }
//     }
//   }
//   alert(`Full name: ${user.name}.`);
//   return user;
// }
// demoGithubUser();
//-------------------------------------
//?We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 10;
}
function f() {
  wait().then((res) => console.log(res));
}
