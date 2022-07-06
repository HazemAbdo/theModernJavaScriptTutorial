// Math.random=>[0,1[
// if 0 I want to make sure that num>=min
// if 1 I want to make sure that num<max
function random(min, max) {
  let rand = Math.random();
  return (rand * max + (1 - rand) * min) % max;
}
p(random(1, 5));
p(random(1, 5));

// if you only want numbers
// then take care that null and "" are corner cases in case
// you use isNan or isFinite
function isNumber(n) {
  return isFinite(n) && !(n == null || n == "");
}
p(isNumber(5));
p(isNumber());
p(isNumber(""));
p(isNumber("z"));
p(isNumber("10z"));
p(isNumber(null));

// TODO solve the examples of Numbers
// Internally the decimal fraction 6.35 is an endless binary.
// As always in such cases, it is stored with a
// The precision loss can cause both increase and decrease of a number.
// In this particular case the number becomes a tiny
// bit less, that’s why it rounded down.
p((6.35).toFixed(1)); //Not correct 6.3 not 6.4
// To solve this
p(Math.round(6.35 * 10) / 10); //will return 6.4(T)
p((1.35).toFixed(1));

let a = 5e6;
console.log("a", a);
let b = 5e-6;
console.log("b", b);
// _ here is called syntax sugar
// In computer science, syntactic sugar is syntax within a programming
// language that is designed to make things easier to read or to express.
// It makes the language "sweeter" for human use:
let billion = 1_000_000_000;
console.log("billion", billion);
console.log(0xff);
console.log(0b11111111);
console.log(0xff);
let num = 255;
console.log(num.toString(2));
console.log(num.toString(16));
console.log(num.toString(8));
console.log((255).toString(16));
let nu = 12.346566449;
console.log(nu.toFixed(2));
console.log(nu.toFixed(3));
console.log(nu.toFixed(4));
console.log(nu.toFixed(5));
p(isNaN("str"));
// NOTE The value NaN is unique in that it is not equal itself
p(NaN === NaN);
p(isFinite(Infinity));
// Object.is is a built-in function that checks if two values
// are the same value.
p(Object.is(NaN, NaN)); //NOTE TRUE
// hints tell you the primitive type that should be used in the
// context of the object
