"use strict";
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}
//-------------------------------
class Rabbit extends Animal {
  age = 3;
  //if a class extends another class and has no constructor,
  //then the following “empty” constructor is generated
  //   constructor(...args) {
  //     super(...args);
  //   }
  //Constructors in inheriting classes //! must call super(...),
  //and (!) do it before using this
  //? why it is a must to call super first
  //there’s a distinction between a constructor function of an inheriting //*(derived constructor)
  //class and other functions. It has a special internal property //* [[ConstructorKind]]:"derived"
  //That’s a special internal label.That label affects its behavior with new.
  //When a regular function is executed with new, it creates an empty object and assigns it to this.
  //But when a derived constructor runs it //*expects the parent constructor to do this job.
  constructor(_name, _earLength) {
    super(_name);
    this.earLength = _earLength;
  }
  hide() {
    console.log(`${this.name} hides!`);
  }
  //here we override parent method
  stop() {
    //! SyntaxError: 'super' keyword unexpected here
    // setTimeout(function () {
    //   super.stop();
    // }, 1000);
    //Arrow functions revisited, arrow functions //* do not have super.
    // If accessed, it’s taken from the outer function.
    setTimeout(() => super.stop(), 1000);
  }
}
let rabbit = new Rabbit("White Rabbit", 5);
console.log(rabbit.earLength); //5
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
//----------------------------------------------------------------------
class Animal2 {
  name = "animal";
  constructor() {
    console.log(this.name); // (*)
  }
  sayHi() {
    console.log("Hi I am an animal");
  }
}
class Rabbit2 extends Animal2 {
  name = "rabbit";
  constructor() {
    super();
  }
  sayHi() {
    console.log("Hi I am a rabbit");
  }
}
new Animal2(); // animal
// the parent constructor always uses its //! own field value, not the overridden one.
new Rabbit2(); // animal
//-------------------------
new Animal2().sayHi(); //Hi I am an animal
// When the parent constructor is called in the derived class, it uses //* the overridden method.
new Rabbit2().sayHi(); //Hi I am a rabbit
//------------------------------------------------------TASKS--------------------------------------------------
class Animal3 {
  constructor(name) {
    this.name = name;
  }
}
class Rabbit3 extends Animal3 {
  constructor(name) {
    //! this.name = name;
    //* solution
    super(name);
    this.created = Date.now();
  }
}
let rabbit3 = new Rabbit("White Rabbit3"); //! Error: this is not defined
console.log(rabbit3.name);
//------------------------------------
class Clock {
  constructor({ template }) {
    this.template = template;
  }
  render() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;
    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);
    console.log(output);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}
//Create a new class ExtendedClock that inherits from Clock and adds the parameter precision
//– the number of ms between “ticks”. Should be 1000 (1 second) by default.
class ExtendedClock extends Clock {
  constructor({ template }, _precision = 1000) {
    super({ template });
    this.precision = _precision;
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
}
let clock = new ExtendedClock({ template: "h:m:s" }, 2000);
clock.start();
