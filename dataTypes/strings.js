// function extractCurrencyValue(str)
// {
//   return str.slice(1);
// }
// p(extractCurrencyValue("$12000000000000"));
// function truncate(str, maxLength) {
//   if (str.length <= maxLength) return str;
//   else return str.slice(0, maxLength - 1) + "...";
// }
// p(truncate("What I'd like to tell on this topic is:", 20) );

// p(truncate("Hi everyone!", 20));
// function checkSpam(str) {
//   var lowerStr = str.toLowerCase();
//   return lowerStr.includes("viagra") || lowerStr.includes("xxx");
// }
// p(checkSpam("buy ViAgRA now"));
// p(checkSpam("free xxxxx"));
// p(checkSpam("innocent rabbit"));

// function ucFirst(str) {
//   return str == null || str == "" ? str : str[0].toUpperCase() + str.slice(1);
// }
// p(ucFirst(null));

//NOTE substrings methods
//.includes() .startsWith .endsWith() if you want to check only existence
// .indexOf() .lastIndexOf() if you want to check existence and get position
//to get substring==> substring() substr() slice()
//slice(start,end)==>[start:end[ ///slice(start)==>[start:end]
//slice(-num,-num2)   str="haha" -3 -2 -1 *
// substring() almost the same as slice but it allows start > end && any -num is 0
//str.substr(start [, length]) start can be -num
// let str = "Widget with id";
//why not check with just==> if(str.indexOf("Widget"))  ?
//The answer is what if it founds the substring at index 0?
// a tricky alternative for str.indexOf("Widget") != -1 is ~str.indexOf("")
//~n===-(n+1) so it's only false if n=-1
//if (~str.indexOf(...)) reads as “if found”
// if (str.indexOf("Widget") != -1) {
//     p("We found it");
// }
// let str = "Widget with id";
// p(str.indexOf("Widget"));
// p(str.indexOf("widget"));
// p(str.indexOf("id"));

//NOTE how to internationalization strings comparison??
//Luckily, all modern browsers (IE10- requires the additional library Intl.js)
//support the internationalization standard ECMA-402.
//It provides a special method to compare strings in
//different languages,following this language special rules for arranging letters
// str.localeCompare(str2)
//Returns a negative number if str is less than str2.
//Returns a positive number if str is greater than str2.
//Returns 0 if they are equivalent
// p("Österreich".localeCompare("Zealand"));

// let str = `Hello`;
//The only difference between them is that if no character is found,
//[] returns undefined, and charAt returns an empty string
// p(str[1000]);
// p(str.charAt(1000));
