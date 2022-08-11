"use strict";
// Generators can return (“yield”) multiple values,
//Generator functions behave differently from regular ones. When such function is called it doesn’t run its code.
//Instead it returns a special object, called “generator object”, to manage the execution.
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
// "generator function" creates "generator object"
let gen = generateSequence();
console.log(gen); // [object Generator]
//The function doesn't start execution when we call it but it gives us object that //!control its execution
// The main method of a generator is //! next().
//When called, it runs the execution until //* the nearest yield <value> statement
let one = gen.next();
console.log(one); //{value: 1, done: false}
let two = gen.next();
console.log(two); //{value: 2, done: false}
let three = gen.next();
console.log(three); //{value: 3, done: true}
//---------------
console.log(gen.next()); //{value: undefined, done: true}
console.log(gen.next()); //{value: undefined, done: true}
console.log("-----------------------------");
//----------------------------------------------------------------
//generators are iterable -->for...of
function* generateSequence2() {
  yield 1;
  yield 2;
  return 3;
}
let gen2 = generateSequence2();
for (const x of gen2) {
  console.log(x); //1 2 //! (if we want 3 then all of them must be yield)
}
//-------------
function* generateSequence3() {
  yield 1;
  yield 2;
  yield 3;
}
let gen3 = generateSequence3();
for (const x of gen3) {
  console.log(x); //1 2 33
}
console.log("-----------------------------");
//----------------------------------------------------------------
//! Generator composition
// is a special feature of generators that allows to transparently //! “embed” generators in each other.
function* generateSequence4(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
function* generatePasswordCodes() {
  // 0..9
  //* yield* gen iterates over the generator gen and transparently forwards its yields outside
  yield* generateSequence4(48, 57);
  // A..Z
  yield* generateSequence4(65, 90);
  // a..z
  yield* generateSequence4(97, 122);
}
let str = "";
for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}
console.log(str); //0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
console.log("-----------------------------");
//----------------------------------------------------------------
// “yield” is a two-way street let's play //* ping-pong
//generator pass value to outer-code-->ping
//outer-code pass result of previous yield to generator-->pong
//------------
// generator()
// {
//     let result1=yield value1;
//     let result2=yield value2;
// }
// value1=generator.next().value
// value2=generator.next(result1).value
//-------------
function* gen4() {
  let ask1 = yield "2 + 2 = ?";
  console.log(ask1); // 4
  let ask2 = yield "3 * 3 = ?";
  console.log(ask2); // 9
}
let generator = gen4();
console.log(generator.next().value); // "2 + 2 = ?"
console.log(generator.next(4).value); // "3 * 3 = ?"
console.log(generator.next(9).done); // true
console.log("-----------------------------");
//----------------------------------------------------------------
// * generator.return()
// generator.return(value) finishes the generator execution and return the given value.
function* gen5() {
  yield 1;
  yield 2;
  yield 3;
}
const g = gen5();
console.log(g.next()); // { value: 1, done: false }
console.log(g.return("foo")); // { value: "foo", done: true }
console.log(g.next()); // { value: undefined, done: true }
console.log("-----------------------------");
//----------------------------------------------------------------
//* generator.throw()
// the outer code may pass a value into the generator, as the result of yield.
// …But it can also initiate (throw) an error there. That’s natural, as an error is a kind of result.
// function* genWithErr() {
//   try {
//     let result = yield "2 + 2 = ?"; // (1)

//     console.log(
//       "The execution does not reach here, because the exception is thrown above"
//     );
//   } catch (e) {
//     console.log(e); // shows the error
//   }
// }
// let generatorWithErr = genWithErr();
// let question = generatorWithErr.next().value;
// console.log(question);
// //we can also make try-catch here instead of inside the generator
// // try {
// generatorWithErr.throw(new Error("The answer is not found in my database")); // (2)
// // } catch (err) {
// console.log(err);
// // }
//------------------------------------------------TASKS---------------------------------------------------
let taskGenerator = pseudoRandom(1);
function* pseudoRandom(seed) {
  let prev = seed;
  while (true) {
    prev = (prev * 16807) % 2147483647;
    yield prev;
  }
}
console.log(taskGenerator.next().value); // 16807
console.log(taskGenerator.next().value); // 282475249
console.log(taskGenerator.next().value); // 1622650073
