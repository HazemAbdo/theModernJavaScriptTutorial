// let func = new Function ([arg1, arg2, ...argN], functionBody);
//function body is a string
//arguments can be 'a', 'b' or 'a,b' or 'a , b'
let sum = new Function("a", "b", "return a + b");
console.log(sum(1, 2)); // 3
//the function is created literally from a string, that is passed at run time
//e.g. we can receive a new function from a server and then execute it:
// let str = ... receive the code from a server dynamically ...
// let func = new Function(str);
// func();
//---------------------------------------
//But when a function is created using new Function, its [[Environment]]
//is set to reference not the current Lexical Environment, but the global one.
//So, such function doesn’t have access to outer variables, only to the global ones.
function getFunc() {
  let value = "test";
  //can't access outer variables
  let func = new Function("console.log(value)");
  return func;
}
// getFunc()(); // error: value is not defined
//-----------------------------------------
//This special feature of new Function looks strange, but appears very useful in practice-->minifiers
//If new Function had access to outer variables, it would have problems with minifiers
//if a function has let userName, minifier replaces it with let a
//((if)) new Function had access to outer variables, it would be unable to find renamed userName