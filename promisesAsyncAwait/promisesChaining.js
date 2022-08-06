//* Returning promises allows us to build chains of asynchronous actions.
//------------------------------------------
//Here the first .then shows 1 and returns new Promise(…) in the line (*).
//After one second it resolves, and the result (the argument of resolve, here it’s result * 2)
//is passed on to the handler of the second .then. That handler is in the line (**),
//it shows 2 and does the same thing.So the output is the same as in the previous example:
//1 → 2 → 4, but now with 1 second delay between alert calls.
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1
    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)
    alert(result); // 2
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4
  });
//-----------------------------------------------------
//real life example
// Make a request for user.json
fetch("/article/promise-chaining/user.json")
  // Load it as json
  .then((response) => response.json())
  // Make a request to GitHub
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then((response) => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      //As a good practice, an asynchronous action //* should always return a promise.
      //That makes it possible to plan actions after it;
      //even if we don’t plan to extend the chain now, we may need it later.
      resolve(githubUser);
    }, 3000);
  });
//---------------------------we can make code reusable------------------------
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}
function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}
function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// Use them:
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
//-------------------------------------------------------TASKS------------------------------------------
//? Are these code fragments equal? 
// In other words,do they behave the same way in any circumstances, for any handler functions?
//----------
// in the first example, there’s a catch below, and in the second one there isn’t, so the error is unhandled.
promise.then(f1).catch(f2);
promise.then(f1, f2);
