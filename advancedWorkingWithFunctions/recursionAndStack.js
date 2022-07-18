//recursion depth is The maximal number of nested calls( maximal number of context in the stack.)
//The information about the process of execution of a running function is stored in its execution context.
//The execution context is an internal data structure that contains details about the execution of a function:
//where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.
//execution context stack
//------------------------------------
//example of recursive traversal.
let company = {
  // the same object, compressed for brevity
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};
// The function to calc total salaries of the company
function sumSalaries(depart) {
  if (Array.isArray(depart)) {
    return depart.reduce((previous, current) => previous + current.salary, 0);
  } else {
    let sum = 0;
    for (const subDepart of Object.values(depart)) {
      sum += sumSalaries(subDepart);
    }
    return sum;
  }
}
console.log(sumSalaries(company)); //7700
//----------------------------------------
//A recursive data structure (recursively-defined) is a structure that replicates itself in parts.
//e.g. linked list  list = { value, next -> list }
//------------------------------------------------------Tasks---------------------------------------------------------
function sumTo(n) {
  //   return n == 1 ? 1 : n + sumTo(n - 1);
  //---------------------------
  //   let sum = 0;
  //   for (let i = 1; i <= n; i++) {
  //     sum += i;
  //   }
  //   return sum;
  //---------------------------
  return (n * (1 + n)) / 2;
}
console.log(sumTo(100));
//---------------------------
function fib(n) {
  let a = 1;
  let b = 1;
  let c = 0;
  for (let i = 3; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}
console.log(fib(77));
//---------------------------
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};
function printList(list) {
  console.log(list.value);
  if (list.next == null) {
    return;
  }
  printList(list.next);
}
function printList2(list) {
  while (list) {
    console.log(list.value);
    list = list.next;
  }
}
// printList(list);
// printList2(list);
// //---------------------------
function printListReverse(list) {
  if (list.next) {
    printListReverse(list.next);
  }
  console.log(list.value);
}
printListReverse(list);
