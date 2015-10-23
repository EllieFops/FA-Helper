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
  /**
   * UI Component
   *
   * @param element {String|Element}
   *
   * @constructor
   */
  function HTML(element)
  {
    this.element = (element instanceof Element) ? element : document.createElement(element);
  }

  /**
   * Append children to given element.
   *
   * @param children {HTMLElement[]}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.appendChildren = function (children)
  {
    var i;

    for (i = 0; i < children.length; i++) {
      this.element.appendChild(children[i]);
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
  HTML.prototype.applyStyle = function (style)
  {
    var key, css, e;
    e = this.element;

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
   *
   * @param search {string}
   *
   * @return {octFAH.util.HTML|HTML|null}
   */
  HTML.prototype.parent = function (search)
  {
    var parent, i;

    parent = this.element.parentNode;

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
  HTML.prototype.getElement = function ()
  {
    return this.element;
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
    this.element.addEventListener('click', func);

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
      return this.element.getAttribute(key);
    }

    this.element.setAttribute(key, val);

    return this;
  };

  /**
   * Set Attributes
   *
   * @param vals {object}
   *
   * @return {octFAH.util.HTML|HTML}
   */
  HTML.prototype.attributes = function(vals)
  {
    var a;
    for (a in vals) {
      if (!vals.hasOwnProperty(a)) {
        continue;
      }

      this.element.setAttribute(a, vals[a]);
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

  return HTML;
})();