class updateElement {
  constructor(element) {
    this.bindingElement = element;
    this.content = [];
  }
  static createLiElement(txt) {
    let element = document.createElement("li");
    element.textContent = txt;
    return element;
  }
  update() {
    // first clear the binding element
    this.bindingElement.innerHTML = "";
    for (const txt of this.content) {
      this.bindingElement.appendChild(updateElement.createLiElement(txt));
    }
  }
  add(txt) {
    this.content.push(txt);
    this.update();
  }
  remove(index) {
    this.content = this.content.splice(index, 1);
    this.update();
  }
}
