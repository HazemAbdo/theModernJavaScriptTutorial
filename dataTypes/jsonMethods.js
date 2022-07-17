//Let’s say we have a complex object, and we’d like to convert it into a string
//,to send it over a network, or just to output it for logging purposes.
//1.First solution We could implement the conversion like this:
// Updating such toString after every update of the object can become a pain.
let user = {
  name: "John",
  age: 30,

  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  },
};
console.log(user); // {name: "John", age: 30}
//-----------------------------------------
//2.JSON.stringify
//NOTE let json = JSON.stringify(value[, replacer, space])
//NOTE replacer-->Array of properties to encode or a mapping function function(key, value)
//NOTE space Amount of space(indentation) to use for formatting
//object-->JSON(string)
//The resulting json string is called a JSON-encoded or serialized or stringified or marshalled object
//JSON.stringify can be applied to primitives as well.
let student = {
  name: "John",
  age: 30,
  isAdmin: false,
  courses: ["html", "css", "js"],
  spouse: null,
};
let json = JSON.stringify(student);
console.log(typeof json); // we've got a string!
//-----------------------------------------
console.log(json); //{"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"spouse":null}
console.log(student); //{name: 'John', age: 30, isAdmin: false, courses: Array(3), spouse: null}
//JSON vs object literal
// Strings use double quotes. No single quotes or backticks in JSON 'john'-->"john"
//Object property names are double-quoted also. name-->"name" age-->"age"
//-----------------------------------------
//JSON is data-only language-independent specification, so some JavaScript-specific
//object properties are skipped by JSON.stringify.Namely:
// Function properties (methods).
// Symbolic keys and values.
// Properties that store undefined
//-----------------------------------------
let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // meetup references room
};

room.occupiedBy = meetup; // room references meetup
// console.log(JSON.stringify(meetup)); //TypeError: Converting circular structure to JSON
//one solution use replacer
console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);
//-----------------------------------------
//toJSON is used both for the direct call JSON.stringify(room) and when room is nested in another encoded object.
let room2 = {
  number: 24,
  toJSON() {
    return this.number;
  },
};
let meetup2 = {
  title: "Conference",
  room2,
};
console.log(JSON.stringify(room2)); // 24

console.log(
  JSON.stringify(meetup2, function replacer(key, value) {
    return key == "room" ? undefined : value;
  })
); //{"title":"Conference","room2":24}
//--------------------------------------------------------------------------------------------------------
//NOTE JSON.parse
//NOTE let value = JSON.parse(str, [reviver]);
//NOTE reviver Optional function(key,value) that will be called for each (key, value) pair and can transform the value
//DONOT typical mistakes in hand-written JSON
// JSON does not support comments.
let json2 = `{
    name: "John",                     // mistake: property name without quotes
    "surname": 'Smith',               // mistake: single quotes in value (must be double)
    'isAdmin': false                  // mistake: single quotes in key (must be double)
    "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
    "friends": [0,1,2,3]              // here all fine
  }`;
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup3 = JSON.parse(str);
// console.log(meetup3.date.getDate());//TypeError TypeError: meetup3.date.getDate is not a function
//The value of meetup.date is a string, not a Date object
let meetup4 = JSON.parse(str, function (key, value) {
  if (key == "date") return new Date(value);
  return value;
});
console.log(meetup4.date.getDate()); //30
//--------------------------------------------------------------------------------------------------------
let user3 = {
  name: "John Smith",
  age: 35,
};
let json3 = JSON.stringify(user3);
console.log("json3", json3);
let user33 = JSON.parse(json3);
console.log("user33", user33);
//------------------------------
let room5 = {
  number: 23,
};

let meetup5 = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room5,
};

// circular references
room5.occupiedBy = meetup5;
meetup5.self = meetup5;

// console.log(JSON.stringify(meetup5));//error
console.log(
  JSON.stringify(meetup5, function replacer(key, value) {
    return key != "" && value == meetup5 ? undefined : value;
  })
);
