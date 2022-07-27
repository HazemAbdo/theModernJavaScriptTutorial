"use strict";
//we have to types of properties in object-->data property vs accessor property(set&&get)
let user = {
  name: "Hazem",
  surName: "Abdo",
  get fullName() {
    return `${this.name} ${this.surName}`;
  },
  set fullName(value) {
    [this.name, this.surName] = value.split(" ");
  },
};
//the key word get(set) that enable my to say user.fullName
//without it's its not a getter it's a function user.fullName()
//From the outside, an accessor property looks like a regular one.
//That’s the idea of accessor properties. We don’t call user.
//fullName as a function, we read it normally: the getter runs behind the scenes
console.log(user.fullName); //Hazem Abdo
user.fullName = "haha lol";
console.log(user.fullName); //haha lol
//------------------------------------------------------------------------
//accessor descriptor don't have writable or value they only have
//set + get + enumerable + configurable
let user2 = {
  name: "John",
  surname: "Smith",
};
Object.defineProperty(user2, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});
console.log(user2.fullName); //John Smith
//------------------------------------------------------------------------
//smarter setter and getter(have more logic in it)
let user3 = {
  set name(value) {
    if (value.length < 8) {
      console.log("enter a valid name");
      return;
    }
    this._name = value;
  },
  get name() {
    return this._name;
  },
};
//Technically, external code is able to access the name directly by using user._name.
//But there is a widely known convention that properties starting with an //**underscore "_"
//are internal and should not be touched from outside the object.
user3.name = "kak"; //enter a valid name
user3.name = "kaaaaaaaaak"; //kaaaaaaaaak
console.log(user3.name);
//-----------------------------------------------------------------------------------------
//Using for //**compatibility
//One of the great uses of accessors is that they allow to take control over a “regular”
// data property at any moment by replacing it with a getter and a setter and //**tweak its behavior
//imagine we start with this implementation for constructor then we find that date is more important
function User4(name, age) {
  this.name = name;
  this.age = age;
}
let john = new User4("John", 25);
//------------------------------
function User4(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  //we still can handle age
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
}

let john2 = new User4("John", new Date(1992, 6, 1));
console.log(john2.age); //30
