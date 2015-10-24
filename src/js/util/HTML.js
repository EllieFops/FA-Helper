/**
 * Element Helper
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */
octFAH.util.HTML = (function ()
{

  "use strict";

  /**
   * UI Component
   *
   * @param element {String|Element|Node}
   *
   * @constructor
   */
  function HTML(element)
  {
    this._element = (element instanceof Element) ? element : document.createElement(element);
  }

  /**
   * Append children to given element.
   *
   * @param children {Element|Element[]|HTML|octFAH.util.HTML}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.append = function (children)
  {
    var i;

    if (children instanceof HTML || children instanceof octFAH.util.HTML) {
      this._element.appendChild(children.element());
    } else if (children instanceof Element) {
      this._element.appendChild(children);
    } else if (children instanceof Array) {
      for (i = 0; i < children.length; i++) {
        this._element.appendChild(children[i]);
      }
    }

    return this;
  };

  /**
   * Apply Style to element
   *
   * @param style   {object}
   *
   * @return {octFAH.util.HTML|HTML} Returns first argument only if it was an
   *                                 HTMLElement.
   */
  HTML.prototype.style = function (style)
  {
    var key, css, e;
    e = this._element;

    css = e.style;
    for (key in style) {
      if (!style.hasOwnProperty(key)) {
        continue;
      }

      if (typeof css[key] === "undefined") {
        continue;
      }

      css[key] = style[key];
    }

    return this;
  };

  /**
   * Locate Parent Node by Query String
   *
   * @param search {string}
   *
   * @return {octFAH.util.HTML|HTML|null}
   */
  HTML.prototype.parent = function (search)
  {
    var parent, i;

    parent = this._element.parentNode;

    for (i = 0; i < 300; i++) {
      if (this.matches(search, parent)) {
        return new HTML(parent);
      }

      parent = parent.parentNode;
    }

    return null;
  };

  /**
   * Get Wrapped Element
   *
   * @returns {Element}
   */
  HTML.prototype.element = function ()
  {
    return this._element;
  };

  /**
   * Add an onClick event handler
   *
   * @param func {Function}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.click = function (func)
  {
    this._element.addEventListener("click", func);
    return this;
  };

  /**
   * Add an onInput event handler
   *
   * @param func {Function}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.input = function (func)
  {
    this._element.addEventListener("input", func);
    return this;
  };

  /**
   * Add an onChange event handler
   *
   * @param func {Function}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.change = function (func)
  {
    this._element.addEventListener("change", func);
    return this;
  };

  /**
   * Get/Set Attribute
   *
   * @param key   {string}
   * @param [val] {string}
   *
   * @return {octFAH.util.HTML|HTML|string}
   */
  HTML.prototype.attribute = function (key, val)
  {
    if (typeof val === "undefined") {
      return this._element.getAttribute(key);
    }

    this._element.setAttribute(key, val);

    return this;
  };

  /**
   * Set Attributes
   *
   * @param vals {object}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.attributes = function (vals)
  {
    var a;

    for (a in vals) {
      if (!vals.hasOwnProperty(a)) {
        continue;
      }

      this._element.setAttribute(a, vals[a]);
    }

    return this;
  };

  /**
   * Check whether or not a given element matches a query selector
   *
   * @param selector {string}
   * @param ref      {Element}
   *
   * @returns {boolean}
   */
  HTML.prototype.matches = function (selector, ref)
  {
    if (typeof ref.matches === "function") {
      return ref.matches(selector);
    }

    if (typeof ref.webkitMatchesSelector === "function") {
      return ref.webkitMatchesSelector(selector);
    }

    if (typeof ref.mozMatchesSelector === "function") {
      return ref.mozMatchesSelector(selector);
    }

    if (typeof ref.msMatchesSelector === "function") {
      return ref.msMatchesSelector(selector);
    }

    return false;
  };

  /**
   * Add Classes
   *
   * @param c {string|string[]}
   *
   * @return {HTML|octFAH.util.HTML}
   */
  HTML.prototype.addClass = function (c)
  {
    var a;

    a = this._element.classList;

    if (c instanceof Array) {
      a.add.apply(a, c);
    } else if (typeof c === "string") {
      a.add(c);
    }

    return this;
  };

  /**
   * Get/Set Inner HTML
   *
   * @param inner {string}
   *
   * @returns {string|HTML|octFAH.util.HTML}
   */
  HTML.prototype.html = function (inner)
  {
    if (typeof inner === "undefined") {
      return this._element.innerHTML;
    }

    this._element.innerHTML = inner;
    return this;
  };

  return HTML;
}());