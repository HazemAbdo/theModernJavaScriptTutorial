let options3 = {
  size: {
    width5: 100,
    height5: 200,
  },
  items: ["Cake", "Donut"],
  extra: true,
};
let {
  size: { width5, height5 },
  items: [item1, item2],
  title4 = "Menu",
} = options3;
console.log("item2", item2); //Donut
console.log("w5", width5);//200
// console.log("size", size);//Uncaught ReferenceError ReferenceError: size is not defined
// console.log("items", items);//ReferenceError ReferenceError: items is not defined
