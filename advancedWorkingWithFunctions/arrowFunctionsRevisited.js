// arrow vs function(){} how to deal with this
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    // arrow functions do not have this. If this is accessed, it is taken from the outside
    // Our Group: John
    // Our Group: Pete
    // Our Group: Alice
    this.students.forEach((student) =>
      console.log(this.title + ": " + student)
    );
  },
};
group.showList();
//-------------
let group2 = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    //before bind
    // undefined: John
    // undefined: Pete
    // undefined: Alice
    //after bind
    // Our Group: John
    // Our Group: Pete
    // Our Group: Alice
    this.students.forEach(
      function (student) {
        // Error: Cannot read property 'title' of undefined
        console.log(this.title + ": " + student);
      }.bind(this)
    );
  },
};
group2.showList();
//----------------------------------------------------------------------
// Not having this naturally means another limitation:
// arrow functions can’t be used as constructors. They can’t be called with new
// const func = () => {};
// let f = new func(); //Uncaught TypeError TypeError: func is not a constructor
//----------------------------------------------------------------------
//bind vs arrow
// .bind(this) creates a “bound version” of the function.
// The arrow => doesn’t create any binding. The function simply doesn’t have this.
// The lookup of this is made exactly the same way as a regular variable
// search in the outer lexical environment.
//----------------------------------------------------------------------
//arrow function doesn't have arguments&&this
//  That’s great for decorators, when we need to forward a call with the current this and arguments.
function defer(f, ms) {
  //--------using arrow--------------
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
  //--------using ordinary function-----------
  //Here we had to create additional variables args and ctx so that
  //the function inside setTimeout could take them.
  //   return function (...args) {
  //     let ctx = this;
  //     setTimeout(function () {
  //       return f.apply(ctx, args);
  //     }, ms);
  //   };
}
function sayHi(who) {
  console.log("Hello, " + who);
}
let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
