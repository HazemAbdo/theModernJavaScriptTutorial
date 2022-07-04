//user becomes a self-descriptive string or a
//money amount, depending on the conversion. The single method
//DO [Symbol.toPrimitive] handles all conversion cases
// let user = {
//   name: "John",
//   money: 1000,

//   [Symbol.toPrimitive](hint) {
//     alert(`hint: ${hint}`);
//     return hint == "string" ? `{name: "${this.name}"}` : this.money;
//   },
// };
// // conversions demo:
// alert(user); // hint: string -> {name: "John"}
// alert(+user); // hint: number -> 1000
//why + is default?
//as binary plus + can work both with strings
//(concatenates them) and numbers (adds them)
// alert(user + 500); // hint: default -> 1500
//------------------------------------------

//If there’s no Symbol.toPrimitive then JavaScript tries to
//find methods toString and valueOf:
//For the "string" hint: call toString method, and if it doesn’t exist,
//then valueOf (so toString has the priority for string conversions).
//For other hints: valueOf, and if it doesn’t exist,
//then toString (so valueOf has the priority for maths)
// let user = {
//   name: "John",
//   money: 1000,

//   // for hint="string"
//   toString() {
//     return `{name: "${this.name}"}`;
//   },

//   // for hint="number" or "default"
//   valueOf() {
//     return this.money;
//   },
// };

// alert(user); // toString -> {name: "John"}
// alert(+user); // valueOf -> 1000
// alert(user + 500); // valueOf -> 1500
// let user = {
//   name: "hello",
//   age: 15,
//   address: {
//     street: "kakkk",
//   },
//   sayHi() {
//     console.log("ahhhhhhhhhhhhh");
//   },
// };
