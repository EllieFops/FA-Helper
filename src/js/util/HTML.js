/**
 * Element Helper
 *
 * @namespace octFAH.util.HTML
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.3
 *
 * @param element {string|Node}
 *
 * @constructor
 */
octFAH.util.HTML = function (element) {
  this._htmlElement = (element instanceof Node) ? element : document.createElement(element);
};

octFAH.util.HTML = Object.create(
  Object.prototype,
  {
    /**
     * Get Wrapped Element
     *
     * @returns {Element}
     * @public
     */
    get element() {return this._htmlElement;},

    /**
     * Add Classes
     *
     * @param c {string|string[]}
     *
     * @return {HTML|octFAH.util.HTML}
     */
    addClass: function (c) {
      var a;

      a = this._htmlElement.classList;

      if (c instanceof Array) {
        a.add.apply(a, c);
      } else if (typeof c === "string") {
        a.add(c);
      }

      return this;
    },

    /**
     * Append children to given element.
     *
     * @param children {Node|Node[]|octFAH.util.HTML|octFAH.util.HTML[]}
     *
     * @return {octFAH.util.HTML}
     */
    append: function (children) {
      var i;

      if (children instanceof octFAH.util.HTML) {
        this._htmlElement.appendChild(children.element);
      } else if (children instanceof Node) {
        this._htmlElement.appendChild(children);
      } else if (children instanceof Array) {
        for (i = 0; i < children.length; i++) {
          this.append(children[i]);
        }
      }

      return this;
    },

    /**
     * Get/Set Attribute
     *
     * @param key   {string}
     * @param [val] {string}
     *
     * @return {octFAH.util.HTML|string}
     */
    attribute: function (key, val) {
      if (typeof val === "undefined") {
        return this._htmlElement.getAttribute(key);
      }

      this._htmlElement.setAttribute(key, val);

      return this;
    },

    /**
     * Set Attributes
     *
     * @param vals {object}
     *
     * @return {octFAH.util.HTML}
     */
    attributes: function (vals) {
      var a;

      for (a in vals) {
        if (!vals.hasOwnProperty(a)) {
          continue;
        }

        this._htmlElement.setAttribute(a, vals[a]);
      }

      return this;
    },

    /**
     * Add an onChange event handler
     *
     * @param func {Function}
     *
     * @return {octFAH.util.HTML}
     */
    change: function (func) {
      this._htmlElement.addEventListener("change", func);
      return this;
    },

    /**
     * Add an onClick event handler/ Fire Click Event
     *
     * @param [f] {Function}
     *
     * @return {octFAH.util.HTML}
     * @public
     */
    click: function (f) {
      if (!f) {this._htmlElement.click();} else {this._htmlElement.addEventListener("click", f);}
      return this;
    },

    /**
     * Get/Set Inner HTML
     *
     * @param h {string}
     *
     * @returns {string|octFAH.util.HTML}
     */
    html: function (h) {
      if (typeof h === "undefined") {return this._htmlElement.innerHTML;}
      this._htmlElement.innerHTML = h;
      return this;
    },

    /**
     * Add an onInput event handler
     *
     * @param func {Function}
     *
     * @return {octFAH.util.HTML}
     */
    input: function (func) {
      this._htmlElement.addEventListener("input", func);
      return this;
    },

    /**
     * Check whether or not a given element matches a query selector
     *
     * @param selector {string}
     * @param ref      {Element}
     *
     * @returns {boolean}
     */
    matches: function (selector, ref) {
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
    },

    /**
     * Locate Parent Node by Query String
     *
     * @param search {string}
     *
     * @return {octFAH.util.HTML|null}
     */
    parent: function (search) {
      var parent, i;

      parent = this._htmlElement.parentNode;

      for (i = 0; i < 300; i++) {
        if (this.matches(search, parent)) {
          return new octFAH.util.HTML(parent);
        }

        parent = parent.parentNode;
      }

      return null;
    },

    /**
     * Apply Style to element
     *
     * @param style {object}
     *
     * @return {octFAH.util.HTML}
     * @public
     */
    style: function (style) {
      var key, css, e;
      e = this._htmlElement;

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
    },

    value: function(value) {
      if (typeof this._htmlElement.value === "undefined") {
        if (typeof value === "undefined") {
          return this._htmlElement.innerHTML;
        }
        this._htmlElement.innerHTML = value;
        return this;
      }

      if (typeof value === "undefined") {
        return this._htmlElement.value;
      }

      this._htmlElement.value = value;

      return this;
    }
  }
);