//1.Date Creation
//NOTE date=new Date(timestamp) &&timestamp=date.getTime()
//An integer number representing the number of milliseconds
//that has passed since the beginning of 1970 is called a timestamp
let Jan01_1970 = new Date(0); //Jan 01 1970 02:00:00
let Dec31_1969 = new Date(-24 * 3600 * 1000); //Dec 31 1969 02:00:00 GMT+0200
let Jan02_1970 = new Date(24 * 3600 * 1000); //Jan 02 1970 02:00:00
let timeStamp = Dec31_1969.getDate(); //31
let timeStamp2 = Jan01_1970.getDate(); //1
let timeStamp3 = Jan02_1970.getDate(); //2
console.log(Jan01_1970);
console.log(Jan02_1970);
console.log(Dec31_1969);
console.log(timeStamp);
console.log(timeStamp2);
console.log(timeStamp3);
//----------------------------------------------------
//NOTE new Date(datestring)
let date = new Date("2017-01-26");
console.log(date); // Jan 26 2017
//----------------------------------------------------
//NOTE new Date(year, month, date, hours, minutes, seconds, ms)
let date2 = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log(date2); // 1 .01.2011, 02:03:04.567
//----------------------------------------------------------------------------------------------------------------------------
//2.Access date components
//-------------Local Time Zone----------------
let year = date2.getFullYear();
console.log("year", year);
let month = date2.getMonth(); //0:11-->jan:dec
console.log("month", month);
let dayOfMonth = date2.getDate(); //1:31
console.log("dayOfMonth", dayOfMonth);
let hours = date2.getHours();
console.log("hours", hours);
let dayOfWeek = date2.getDay(); //0:6-->sunday:saturday
console.log("dayOfWeek", dayOfWeek);
//-------------UTC+0 Time Zone----------------
//getUTCFullYear(), getUTCMonth(), getUTCDay().
let utcHours = date2.getUTCHours();
console.log("utcHours", utcHours);
//-----------------two special methods--------------------------
//getTime() //number of milliseconds passed from the January 1st of 1970 UTC+0
//Returns the difference between UTC and the local time zone, in minutes:
console.log(new Date().getTimezoneOffset()); //-120
//----------------------------------------------------------------------------------------------------------------------------
//3.Setting date components
// set(UTC)FullYear(year, [month], [date])
// set(UTC)Month(month, [date])
// set(UTC)Date(date)
// set(UTC)Hours(hour, [min], [sec], [ms])
// set(UTC)Minutes(min, [sec], [ms])
// set(UTC)Seconds(sec, [ms])
// set(UTC)Milliseconds(ms)
//setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)
//----------------------------------------------------------------------------------------------------------------------------
//4.Autocorrection
//NOTE That feature is often used to get the date after the given period of time
//The autocorrection is a very handy feature of Date objects.
//We can set out-of-range values,and it will auto-adjust itself.
//Let’s say we need to increase the date “28 Feb 2016” by 2 days.
//It may be “2 Mar” or “1 Mar” in case of a leap-year. We don’t need to think about it.
//Just add 2 days. The Date object will do the rest
let leapYear = new Date(2016, 1, 28);
let notLeapYear = new Date(2015, 1, 28);
leapYear.setDate(leapYear.getDate() + 2);
notLeapYear.setDate(notLeapYear.getDate() + 2);
console.log(leapYear); // 1 Mar 2016
console.log(notLeapYear); // 2 Mar 2016
//------------------------------------------
let currentDate = new Date();
currentDate.setSeconds(currentDate.getSeconds() + 70);
console.log(currentDate); // shows the correct date
//------------------------------------------
//if you pass 0 day, it will return the last day of the previous month
//Normally, dates start from 1, but technically we can pass any number,
//the date will auto adjust itself. So when we pass 0, then it means “one day before 1st day of the month”,
//in other words: “the last day of the previous month”.
date.setDate(0);
//----------------------------------------------------------------------------------------------------------------------------
//5.Date to number, date diff
//When a Date object is converted to number, it becomes the timestamp same as date.getTime():
let start = new Date(); // start measuring time
// do the job
for (let i = 0; i < 100000000; i++) {
  let doSomething = i * i * i;
}
let end = new Date(); // end measuring time
console.log(`The loop took ${end - start} ms`);
//----------------------------------------------------------------------------------------------------------------------------
//6.Date.now()
// If we only want to measure time, we don’t need the Date object.
// Date.now() === new Date().getTime();
//but it doesn’t create an intermediate Date object.
//So it’s faster and doesn’t put pressure on garbage collection.
//It is used mostly for convenience or when performance matters,
//like in games in JavaScript or other specialized applications.

let start2 = Date.now();
for (let i = 0; i < 100000000; i++) {
  let doSomething = i * i * i;
}
let end2 = Date.now();
console.log(`The loop took ${end2 - start2} ms`);
//----------------------------------------------------------------------------------------------------------------------------
//7.Date.parse from a string
//The call to Date.parse(str) parses the string in the given format and returns the timestamp
//(number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns NaN
let ms = Date.parse("2012-01-26T13:51:50.417-07:00");
console.log(ms); // 1327611110417  (timestamp)
//----------------------------------------------------------------------------------------------------------------------------
//8. Tasks
// let date2 = new Date(2011, 0, 1, 2, 3, 4, 567);
let task1Date = new Date(2012, 1, 20, 3, 12);
console.log("task1Date", task1Date);
//------------------------------------
let task2Date = new Date(2012, 0, 3);
function getWeekDay(date) {
  let day = "";
  switch (date.getDay()) {
    case 0:
      day = "SU";
      break;
    case 1:
      day = "MO";
      break;
    case 2:
      day = "TU";
      break;
    case 3:
      day = "WE";
      break;
    case 4:
      day = "TH";
      break;
    case 5:
      day = "FR";
      break;
    case 6:
      day = "SA";
      break;
    default:
      break;
  }
  return day;
}
console.log(getWeekDay(task2Date));
//------------------------------------
//0 sunday--> 6 saturday
//1 monday-->7 sunday//European weekday
let task3Date = new Date(2012, 0, 3);
function getLocalDay(date) {
  let day = date.getDay();
  if (day == 0) {
    // weekday 0 (sunday) is 7 in european
    day = 7;
  }
  return day;
}
console.log(getLocalDay(task3Date));
//------------------------------------
let task4Date = new Date(2015, 0, 2);
function getDateAgo(date, days) {
  let newDate = new Date(date);
  newDate.setDate(date.getDate() - days);
  return newDate.getDate();
}
console.log("getDateAgo", getDateAgo(task4Date, 1)); // 1, (1 Jan 2015)
console.log("getDateAgo", getDateAgo(task4Date, 2)); // 31, (31 Dec 2014)
console.log("getDateAgo", getDateAgo(task4Date, 365)); // 2, (2 Jan 2014)
//------------------------------------

function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}
console.log(getLastDayOfMonth(2012, 1)); // 29
console.log(getLastDayOfMonth(2012, 2)); // 31
console.log(getLastDayOfMonth(2012, 3)); // 30
console.log(getLastDayOfMonth(2012, 4)); // 31
//------------------------------------
//returns the number of seconds from the beginning of today
function getSecondsToday() {
  let now = new Date();
  let startDay = new Date(now.getFullYear(), now.getMonth(), now.getDay());
  return Math.round((now - startDay) / 1000);
}
console.log(getSecondsToday());
//------------------------------------
//How many seconds till tomorrow?
function getSecondsToTomorrow() {
  let now = new Date();
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1);
  return Math.round((tomorrow - now) / 1000);
}
//------------------------------------
function formatDate(date) {
  let diff = new Date() - date;
  console.log("formatDate ~ diff", diff);
  if (diff < 1000) return "right now";
  let sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec} sec. ago`;
  let min = Math.floor(diff / (60 * 1000));
  if (min < 60) return `${min} min. ago`;
  let d = date;
  d = [
    "0" + d.getDate(),
    "0" + (d.getMonth() + 1),
    "" + d.getFullYear(),
    "0" + d.getHours(),
    "0" + d.getMinutes(),
  ].map((component) => component.slice(-2)); // take last 2 digits of every component
  return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
}
console.log(formatDate(new Date(new Date() - 1))); // "right now"
console.log(formatDate(new Date(new Date() - 30 * 1000))); // "30 sec. ago"
console.log(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. ago"
// yesterday's date like 31.12.16 20:00
console.log(formatDate(new Date(new Date() - 86400 * 1000)));
