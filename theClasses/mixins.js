"use strict";
// a mixin is a class containing methods that //* can be used by other classes
//------------
//We can use mixins as a way to //* augment a class by adding multiple behaviors,
//like event-handling as we have seen above.
//------------
//Mixins may become a point of conflict if they accidentally overwrite existing class methods.So generally
//one should think well about the naming methods of a mixin, to minimize the probability of that happening.
//------------
//! without a need to inherit from it.
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};
let sayHiMixin = {
  __proto__: sayMixin,
  sayHi(name) {
    // looks for the method in the prototype of that mixin, not the class
    super.say(`Hi ${name}`);
  },
  sayBye(name) {
    // looks for the method in the prototype of that mixin, not the class
    super.say(`Bye ${name}`);
  },
};
class User {
  constructor(_name) {
    this.name = _name;
  }
}
Object.assign(User.prototype, sayHiMixin);
let user1 = new User("hazem");
//Methods sayHi and sayBye were initially created in sayHiMixin.So even though they got copied to User,
//their [[HomeObject]] internal property references sayHiMixin
//As super looks for parent methods in //! [[HomeObject]].[[Prototype]],
//that means it searches //* sayHiMixin.[[Prototype]], not User.[[Prototype]]
user1.sayHi(user1.name);
user1.sayBye(user1.name);
//--------------------------------------------------------------------------------------------------
//practical example
let eventMixin = {
  /**
   * Subscribe to event, usage:
   *  menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },
  /**
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },
  /**
   * Generate an event with the given name and data
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    );
  },
};
// Make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);
let menu = new Menu();
// add a handler, to be called on selection:
menu.on("select", (value) => alert(`Value selected: ${value}`));
// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
