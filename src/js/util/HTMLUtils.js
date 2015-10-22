/**
 * HTML Utilities
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */

octFAH.util.HTMLUtils = (function() {

  var _app;
  var _self;

  /**
   * HTML Utilities
   *
   * @param app {Application}
   *
   * @constructor
   */
  function HTMLUtils (app)
  {
    _self = this;
    _app  = app;
  }

  /**
   * Append children to given element.
   *
   * @param element  {HTMLElement}
   * @param children {HTMLElement[]}
   *
   * @return {HTMLElement}
   */
  HTMLUtils.prototype.appendChildren = function (element, children)
  {
    var i;

    for (i = 0; i < children.length; i++) {
      element.appendChild(children[i]);
    }

    return element;
  };

  /**
   * Apply Style to element
   *
   * @param element {HTMLElement|HTMLElement[]}
   * @param style   {object}
   *
   * @return {HTMLElement|null} Returns first argument only if it was an
   *                            HTMLElement.
   */
  HTMLUtils.prototype.applyStyle = function (element, style)
  {
    var key, css, i;

    if (element instanceof Array) {
      for (i = 0; i < element.length; i++) {
        this.applyStyle(element[i], style);
      }

      return null;
    }

    css = element.style;
    for (key in style) {

      // skip bad entries
      if (!style.hasOwnProperty(key) || typeof css[key] == "undefined") {
        continue;
      }

      css[key] = style[key];
    }

    return element;
  };

  /**
   * Create an Input Button
   *
   * @param text    {string}
   * @param [click] {Function}
   *
   * @return {HTMLElement}
   */
  HTMLUtils.prototype.makeButton = function (text, click)
  {
    var el = document.createElement("input");
    el.setAttribute("type", "button");
    el.setAttribute("value", text);

    if (click) {
      el.addEventListener("click", click);
    }

    return el;
  };

  /**
   * Make a CheckBox input
   *
   * @param [name]    {string}
   * @param [value]   {string|int}
   * @param [checked] {boolean}
   *
   * @returns {Element}
   */
  HTMLUtils.prototype.makeCheckBox = function (name, value, checked)
  {
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");

    if (name) {
      check.setAttribute("name", name);
    }

    if (value) {
      check.setAttribute("value", value);
    }

    if (checked) {
      check.setAttribute("checked", "checked");
    }

    return check;
  };

  /**
   * Make an HTML Option element.
   *
   * @param val  {string|int} Element Value
   * @param text {string} Element Text
   *
   * @returns {Element}
   */
  HTMLUtils.prototype.makeSelectOption = function (val, text)
  {
    var o       = document.createElement('option');
    o.setAttribute('value', val);
    o.innerHTML = text;
    return o;
  };

  /**
   * Create a span to wrap given text.
   *
   * @param text {string}
   *
   * @returns {Element}
   */
  HTMLUtils.prototype.makeSpan = function (text)
  {
    var s       = document.createElement('span');
    s.innerHTML = text;
    return s;
  };

  /**
   * Make A Label Containing an Element
   *
   * @param text    {String}      Label Text
   * @param element {HTMLElement} Element to wrap
   * @param [before]  {boolean}     Place text before element
   *
   * @returns {Element}
   */
  HTMLUtils.prototype.makeWrapperLabel = function (text, element, before)
  {
    var label, span;
    before = (typeof before == 'undefined') ? true : before;

    label = document.createElement('label');
    span  = document.createElement('span');

    span.innerHTML = text;
    label.appendChild(before ? span : element);
    label.appendChild(before ? element : span);

    return label;
  };

  return HTMLUtils
})();
