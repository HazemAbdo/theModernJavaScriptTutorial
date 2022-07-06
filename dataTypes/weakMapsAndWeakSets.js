//NOTE WeakMap keys must be objects not primitives.
//NOTE WeakMap doesn’t prevent ((garbage-collection)) of key objects
let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "...");
john = null; // overwrite the reference
// john is removed from memory!
//-----------------------------------------------------------------------------------------
//NOTE WeakMap does not support iteration and methods keys(), values(), entries(),
//so there’s no way to get all keys or values from it.
//As the current element count of a WeakMap is not known.
//The engine may have cleaned it up or not, or did it partially.
//For that reason, methods that access all keys/values are not supported.
//-----------------------------------------------------------------------------------------
//NOTE The main area of application for WeakMap is an additional data storage
//If we’re working with an object that “belongs” to another code,
//maybe even a third-party library, and would like to store some data associated with it,
//that should only exist while the object is alive
//NOTE Another common example is caching.
//We can store (“cache”) results from a function, so that future calls on the
//same object can reuse it.
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//NOTE WeakSet It is analogous to Set, but we may only add ((objects)) to WeakSet not primitives
//An object exists in the set while it is reachable from somewhere else
//A membership in WeakSet may mean something about the object.
//for example we make a set that contains the users of some service
//so if you in the set you are an active user and vice versa
//-----------------------------------------------------------------------------------------
//NOTE Your code can access it, but the messages are managed by someone else’s code.
//New messages are added, old ones are removed regularly by that code,
//and you don’t know the exact moments when it happens.
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];
//quest which data structure could you use to store information about whether the message
// “has been read”?-->Y/N question we may think in weakSet
//((When a message is removed from messages, it should disappear from your structure as well))
//((We shouldn’t modify message objects)), add our properties to them. As they are managed by
//someone else’s code, that may lead to bad consequences
//ans 1)use weakMap
//WeakSet is better from the architectural point of view.
let readMessages = new WeakSet();
// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
console.log("Read message 0: " + readMessages.has(messages[0])); // true
console.log("Read message 1: " + readMessages.has(messages[1])); // true
//ans 2)use a symbolic property
//only seen in our code
let isRead = Symbol("isRead");
// two messages have been read
messages[0][isRead] = true;
messages[1][isRead] = true;
console.log("Read message 0: " + messages[0][isRead]); // true
console.log("Read message 1: " + messages[1][isRead]); // true
//-----------------------------------------------------------------------------------------
//quest which data structure you’d suggest to store the information: “when the message was read?”.
//as we want to store a piece of info so we may think in weakMap
let messages2 = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];
let readMessages2 = new WeakMap();
//MSG 0 has been read
readMessages2.set(messages2[0], new Date());
//MSG 1 has been read
readMessages2.set(messages2[1], new Date());
console.log("Read message 0 time: " + readMessages2.get(messages2[0])); //  Wed Jul 06 2022 10:07:24 GMT+0200 (Eastern European Standard Time)
console.log("Read message 0 time: " + readMessages2.get(messages2[1])); // Wed Jul 06 2022 10:07:43 GMT+0200 (Eastern European Standard Time)
