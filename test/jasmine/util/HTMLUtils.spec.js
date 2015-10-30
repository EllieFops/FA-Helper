// jshint ignore:start
describe("The HTMLUtils Helper", function () {

  var fakeApp = jasmine.createSpy("Application");
  fakeApp.wrap = octFAH.app.Application.prototype.wrap;

  var utils = new octFAH.util.HTMLUtils(fakeApp);

  /**
   * @tests octFAH.util.HTMLUtils.makeButton(a)
   */
  it("can create plain HTML button inputs", function () {
    var test = utils.makeButton("Test");

    expect(test instanceof HTMLInputElement).toBe(true);
    expect(test.getAttribute("type")).toBe("button");
    expect(test.value).toBe("Test");
  });

  /**
   * @tests octFAH.util.HTMLUtils.makeButton(a, b)
   */
  it("can create HTML button inputs with click listeners", function () {
    var func = function() {return "test"};
    var test = utils.makeButton("Test");

    spyOn(test, "addEventListener");

    expect(test instanceof HTMLInputElement).toBe(true);
    expect(test.getAttribute("type")).toBe("button");
    expect(test.value).toBe("Test");
    expect(test.addEventListener).toHaveBeenCalledWith("click", func);
  });

});