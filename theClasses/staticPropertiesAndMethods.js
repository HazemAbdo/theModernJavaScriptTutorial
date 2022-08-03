"use strict";
// We can also assign a method //* to the class as a whole not to any particular object of it.
//class MyClass {
//    static property = ...;
//
//    static method() {
//      ...
//    }
//  }
//  ===
//MyClass.property = ...
//MyClass.method = ...
//---------------------------------------------------------------
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  //this means all articles in our system have one author
  static Author = "Agatha Christi";
  //Here Article.compare method stands “above” articles, as a means to compare them.
  //It’s not a method of an article, but rather of the whole class.
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
  //there is no article(instance) at all so it is a static method
  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
}
// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1)),
];
articles.sort(Article.compare);
console.log(articles[0].title); // CSS
console.log(Article.createTodays()); //Article {title: 'Today's digest', date: Wed Aug 03 2022 20:09:44 GMT+0200 (Eastern European Standard Time)}
//! Static methods aren’t available for individual objects
// articles[0].createTodays(); //Uncaught TypeError TypeError: articles[0].createTodays is not a function
//---------------------------------------------------------------
// Static properties and methods are inherited.//?but how
//So, Rabbit extends Animal creates two [[Prototype]] references:
//1-Rabbit function prototypally inherits from Animal function.
//? Animal function is the one that has static functions and properties
//2-Rabbit.prototype prototypally inherits from Animal.prototype.
class Animal {
  static planet = "Earth";
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}
// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
}
let rabbits = [new Rabbit("White Rabbit", 10), new Rabbit("Black Rabbit", 5)];
rabbits.sort(Rabbit.compare);
rabbits[0].run(); // Black Rabbit runs with speed 5.
console.log(Rabbit.planet); // Earth
//---------------------------------------------------------TASKS--------------------------------------------
class Rabbit2 extends Object {
  constructor(name) {
    super();
    this.name = name;
  }
}
//extends gives you access to static properties and methods
console.log(Rabbit2.prototype.__proto__ === Object.prototype); //  true
console.log(Rabbit2.__proto__ === Object); //  true
//-----------------------
class Rabbit3 {
  constructor(name) {
    this.name = name;
  }
}
console.log(Rabbit3.prototype.__proto__ === Object.prototype); //  true
console.log(Rabbit3.__proto__ === Object); //  false
console.log(Rabbit3.__proto__ === Function.prototype); //  true
