// A function can be called with any number of arguments, no matter how it is defined
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2, 3, 4, 5)); //3
//NOTE rest meaning is gather the remaining arguments into an ((array))
//rest must be the last parameter
// function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
//     // error
//   }
//---------------------------------------------------------
//old fashioned way ((arguments))
// There is also a special array-like-->(can't use array methods)
// object named arguments that contains ((all))-->not partially like rest arguments by their index.
//if we access arguments from arrow function, it takes the arguments from the outer function(normal one)
//arrow functions don’t have their own ((this)).
//Now we know they don’t have the special ((arguments)) object either
function f() {
  let showArg = () => console.log(arguments[0]);
  showArg();
}
f(1); // 1
//---------------------------------------------------------
//NOTE spread operator it is meaaning is expans an ((iterable)) into a list of arguments
// it is is the opposite of rest operator
//use spread to convert to array
let str = "hello";
let str2 = "hello2";
let arr = [...str]; //works only with iterables
console.log(arr); // ["h", "e", "l", "l", "o"]
//DO Array.from tends to be more universal.
let arr2 = Array.from(str2); //operates on both array-likes and iterables
console.log(arr2); // ["h", "e", "l", "l", "o","2"]
//---------------------------------------------------------
//copy an array or object
//DO use spread cause it is much shorter than let obj(arr)Copy = Object.assign({}, obj(arr))
let arr3 = [1, 2, 3];
let arrCopy = [...arr3];
console.log(JSON.stringify(arr3) === JSON.stringify(arrCopy)); //true-->same content
console.log(arr3 === arrCopy); //false-->different reference
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj };
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true-->same content
console.log(obj === objCopy); //false-->different reference
