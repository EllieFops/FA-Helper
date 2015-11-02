// jshint ignore:start
describe("An HTML Wrapper:", function() {
  "use strict";

  var elem;
  var id   = "test-id";
  var html;
  var attr = {"test": "value", "test-2": "value-2"};
  var ret;

  // Clear HTML and Element objects so there are no cross effects
  beforeEach(function () {
    elem = document.createElement("div");
    html = new octFAH.util.HTML(elem);
    ret  = null;
  });


  // getElement()


  it("can return it's wrapped element", function() {expect(html.getElement()).toBe(elem);});


  // attribute()


  it("can set single attributes on it's wrapped element", function() {
    ret = html.attribute("id", id);
    expect(elem.getAttribute("id")).toBe(id);
    expect(ret).toBe(html);
  });

  it("can get single attributes from it's wrapped element", function() {
    elem.setAttribute("id", id);
    expect(html.attribute("id")).toBe(id);
  });


  // attributes()


  it("can set mutlitple attributes on it's wrapped element", function () {
    ret = html.attributes(attr);

    for (var i in attr) {
      if (!attr.hasOwnProperty(i)) {continue;}
      expect(elem.getAttribute(i)).toBe(attr[i]);
    }
    expect(ret).toBe(html);
  });


  // addClass()


  it("can add a class to it's wrapped element", function () {
    var clas = "test-class";
    ret = html.addClass(clas);

    expect(elem.classList.contains(clas)).toBe(true);
    expect(ret).toBe(html);
  });

  it("can add an array of classes to it's wrapped element", function() {
    var clas = ["class-a", "class-b", "class-c"];
    ret = html.addClass(clas);

    for (var i = 0; i < clas.length; i++) {
      expect(elem.classList.contains(clas[i])).toBe(true);
    }
    expect(ret).toBe(html);
  });


  // append()


  it("can append a child HTMLElement to it's wrapped element", function () {
    var testChild = document.createElement("span");
    ret = html.append(testChild);

    expect(elem.innerHTML).toBe(testChild.outerHTML);
    expect(ret).toBe(html);
  });


  // appendTo()


  it("can append it's wrapped element to an HTMLElement", function () {
    var testParent = document.createElement("div");
    ret = html.appendTo(testParent);

    expect(testParent.innerHTML).toBe(elem.outerHTML);
    expect(ret).toBe(html);
  });


  // html()


  it("can set it's wrapped element's contents by a string", function () {
    ret = html.html("<span>testing</span>");

    expect(elem.firstChild.nodeName).toBe("SPAN");
    expect(elem.firstChild.innerHTML).toBe("testing");
    expect(ret).toBe(html);
  });

  it("can return it's wrapped element's contents as a string", function () {
    ret = html.html("<span>testing</span>");

    expect(html.html()).toBe("<span>testing</span>");
    expect(ret).toBe(html);
  });


  // matches()


  it("can verify it's wrapped element against a query selector", function () {
    ret = html.attribute("id", "testing");
    expect(html.matches("div#testing")).toBe(true);
    expect(ret).toBe(html);
  });


  // value()


  it("can retrieve input values from it's wrapped element", function () {
    elem = document.createElement('input');
    elem.setAttribute("value", "testing");

    ret = html = new octFAH.util.HTML(elem);
    expect(html.value()).toBe("testing");
    expect(ret).toBe(html);
  });

  it("can set input values on it's wrapped element", function () {
    elem = document.createElement('input');
    html = new octFAH.util.HTML(elem);

    var ret = html.value("testing");
    expect(ret).toBe(html);
    expect(elem.value).toBe("testing");
  });


  // change()


  it("can add onChange listeners", function () {
    var fun = function () {return "bacon";};
    var el = document.createElement("input");
    html = new octFAH.util.HTML(el);

    spyOn(el, "addEventListener");

    var ret = html.change(fun);

    expect(ret).toBe(html);
    expect(el.addEventListener).toHaveBeenCalledWith("change", fun);
  });


  // click()


  it("can add onClick listeners", function() {
    var fun = function() {return "bacon";};
    var el = document.createElement("input");
    html = new octFAH.util.HTML(el);

    spyOn(el, "addEventListener");

    var ret = html.click(fun);

    expect(el.addEventListener).toHaveBeenCalledWith("click", fun);
    expect(ret).toBe(html);
  });

  it("can fire click events", function () {
    var fun = jasmine.createSpy("clickFire");

    var el = document.createElement("input");
    html = new octFAH.util.HTML(el);
    html.click(fun);
    var ret = html.click();

    expect(fun).toHaveBeenCalled();
    expect(ret).toBe(html);
  });


  // input()


  it("can add onInput listeners", function () {
    var func = function() {return "test";};
    elem = document.createElement("input");
    html = new octFAH.util.HTML(elem);

    spyOn(elem, "addEventListener");

    ret = html.input(func);

    expect(elem.addEventListener).toHaveBeenCalledWith("input", func);
    expect(ret).toBe(html);
  });


  // setParent()


  it("can get it's wrapped element's setParent element, wrapped", function () {
    var parent = document.createElement("div");
    var check;
    parent.appendChild(elem);

    check = html.setParent();

    expect(check instanceof octFAH.util.HTML).toBe(true);
    expect(check.getElement()).toBe(parent);
  });

  it("can find a specific setParent of it's wrapped element", function () {
    var top  = document.createElement("div");
    // Place the key element randomly
    var key  = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
    var find;
    var temp = top;
    var last;
    var testReturn;
    for (var i = 0; i < 15; i++) {
      last = temp;
      temp = document.createElement("div");
      last.appendChild(temp);
      if (i === key) {
        find = temp;
        temp.setAttribute("title", "testing")
      }
    }

    ret = html.appendTo(temp);
    testReturn = html.setParent("div[title=testing]");

    expect(testReturn.getElement()).toBe(find);
    expect(ret).toBe(html);
  });


  // style()


  it("can parse standard objects to style it's wrapped element", function () {
    var style = {fontWeight: "bold", "display":"none"};

    ret = html.style(style);

    expect(elem.style.fontWeight).toBe("bold");
    expect(elem.style.display).toBe("none");
    expect(ret).toBe(html);
  });


  // constructor()


  it("can be instantiated using a creation string", function() {
    var string  = "<div.class-a.classb#set-id test-solo class='class-c' custom-attr='this is a \\\'string\\\''>test content</div>";
    var test    = new octFAH.util.HTML(string);
    var element = test.getElement();

    expect(element.classList.contains("class-a")).toBe(true);
    expect(element.classList.contains("classb")).toBe(true);
    expect(element.classList.contains("class-c")).toBe(true);

    expect(element.hasAttribute("id")).toBe(true);
    expect(element.getAttribute("id")).toBe("set-id");

    expect(element.hasAttribute("custom-attr")).toBe(true);
    expect(element.getAttribute("custom-attr")).toBe("this is a \\'string\\'");

    expect(element.innerHTML).toBe("test content");
  });

  it("can be instantiated by passing an HTMLElement", function() {
    var element = document.createElement('div');
    var html    = new octFAH.util.HTML(element);

    element.innerHTML = "Testing";

    expect(html.getElement()).toBe(element);
  });
});
