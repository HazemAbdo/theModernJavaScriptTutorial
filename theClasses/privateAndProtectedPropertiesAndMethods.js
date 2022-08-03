"use strict";
class CoffeeMachine {
  //* Protected properties are usually prefixed with an underscore _.
  //That is not enforced on the language level, but there’s a well-known convention between programmers
  //that such properties and methods should not be accessed from the outside.
  _waterAmount = 0; // the amount of water inside
  //----------
  get waterAmount() {
    return this._waterAmount;
  }
  set waterAmount(wa) {
    this._waterAmount = this.#fixWaterAmount(wa);
  }
  //-----------another way for getter and setter
  //That looks a bit longer, but functions are more flexible.
  //They can accept //* multiple arguments (even if we don’t need them right now).
  getWaterAmount() {
    return this._waterAmount;
  }
  setWaterAmount(wa) {
    this._waterAmount = this.#fixWaterAmount(wa);
  }
  //-----------//* Private properties and methods
  //   We can’t access it from outside or //! from inheriting classes
  //With private fields that’s impossible: //! this['#name'] doesn’t work. 
  //That’s a syntax limitation to ensure privacy
  #waterLimit = 200;
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    return value > this.#waterLimit ? this.#waterLimit : value;
  }
  get waterLimit() {
    return this.#waterLimit;
  }
  //-----------
  constructor(power) {
    this._power = power;
    console.log(`Created a coffee-machine, power: ${power}`);
  }
  // For power property, let’s make it //* read-only
  // we only need to make getter, but not the setter:
  get power() {
    return this._power;
  }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);
// add water
coffeeMachine.waterAmount = -200;
console.log(coffeeMachine.waterAmount); //0
// coffeeMachine.power = 30;//Uncaught TypeError TypeError: Cannot set property power of #<CoffeeMachine> which has only a getter
coffeeMachine.setWaterAmount(20);
console.log(coffeeMachine.getWaterAmount()); //20
// console.log(coffeeMachine.#waterLimit);//'#waterLimit' is not accessible outside class 'CoffeeMachine' because it has a private identifier
console.log(coffeeMachine.waterLimit);
