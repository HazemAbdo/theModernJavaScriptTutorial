//to make the calls chainable
// The solution is to return the object itself from every call.
// let ladder = {
//   step: 0,
//   up() {
//     this.step++;
//     return this;
//   },
//   down() {
//     this.step--;
//     return this;
//   },
//   showStep: function () {
//     // shows the current step
//     print(this.step);
//     return this;
//   },
// };
// ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
// ladder.up().showStep();
// let calculator = {
//   read() {
//     this.a = +prompt("Please enter a", "5");
//     this.b = +prompt("Please enter b", "4");
//   },
//   sum() {
//     return this.a + this.b;
//   },
//   mul() {
//     return this.a * this.b;
//   },
// };

// calculator.read();
// alert(calculator.sum());
// alert(calculator.mul());

// let user = {
//   name: "John",
//   age: 30,
//   sayHi: function () {
//     print("Hello! " + this.name);
//   },
//   sayHalloz() {
//     print("Halloz!");
//   },
// };

// user.sayHi(); // Hello!
// user.sayHalloz(); // Hello!