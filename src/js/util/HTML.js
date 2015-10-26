/**
 * Element Helper
 *
 * @namespace octFAH.util.HTML
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.3
 *
 * @param element {string|Node|octFAH.util.HTML}
 *
 * @constructor
 */
octFAH.util.HTML = function (element) {

  // If the given element is already an instance of this, then wat
  if (element instanceof octFAH.util.HTML) {return element;}

  /**
   * @type {Element}
   * @private
   */
  this._htmlElement = null;

};

octFAH.util.HTML.prototype = Object.create(Object.prototype);

octFAH.util.HTML.prototype._parseInput = function(e) {
  var a, i, tAttribute, tValue, ti;

  if (e instanceof Node) {
    this._htmlElement = e;
  } else if (e.indexOf("<") === 0 && e.indexOf(">") === e.length - 1){
    a = e.split(/((?:\.|#)[\w\-]+)|([\w\-]+\s*=\s*("|').*\3)|([\w\-]+\s*=\s*[\w\-]+)|([\w\-]+)/g);

    this._htmlElement = document.createElement(a.shift());

    for (i = 0; i < a.length; i++) {

      if (a[i].indexOf(".") === 0) {this.addClass(a[i].substr(1)); continue}

      if (a[i].indexOf("#") === 0) {this.attribute("id", a[i].substr(1)); continue;}

      ti = a[i].indexOf("=");
      if (ti !== -1) {
        tAttribute = a[i].substring(0, ti).trim();
        tValue = a[i].substring(ti+1).trim();

        if (tValue.indexOf("'") === 0 || tValue.indexOf("\"") === 0) {tValue = tValue.slice(1, -1);}

        this.setAttribute(tAttribute, tValue);
        tAttribute = tValue = null;
        continue;
      }

      this.setAttribute(a[i], "");
    }

  } else {
    this._htmlElement = document.querySelector(e);
  }

  if (!this._htmlElement) {
    throw "FAHelper: Could not parse argument " + e.toString();
  }

};
/**
 * Get Wrapped Element
 *
 * @returns {Element}
 * @public
 */
octFAH.util.HTML.prototype.getElement = function () {return this._htmlElement;};

/**
 * Add Classes
 *
 * @param c {string|string[]}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.addClass = function (c) {
  var a;

  a = this._htmlElement.classList;

  if (c instanceof Array) {
    a.add.apply(a, c);
  } else if (typeof c === "string") {
    a.add(c);
  }

  return this;
};

/**
 * Append children to given element.
 *
 * @param children {Node|Node[]|octFAH.util.HTML|octFAH.util.HTML[]}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.append = function (children) {
  var i;

  if (children instanceof octFAH.util.HTML) {
    this._htmlElement.appendChild(children.getElement());
  } else if (children instanceof Node) {
    this._htmlElement.appendChild(children);
  } else if (children instanceof Array) {
    for (i = 0; i < children.length; i++) {
      this.append(children[i]);
    }
  }

  return this;
};

/**
 * Append current element to a given element.
 *
 * If a string is provided, it will be used as a query string and the current
 * element will be appended to the first match if any.
 *
 * WARNING: When using a query string, if the query string has no matches this
 *          method will fail silently and return as if it had worked as
 *          intended.
 *
 * @param element {Node|octFAH.util.HTML|string}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.appendTo = function (element) {
  var e, l, i;
  if (typeof element === "string") {
    e = document.querySelector(element);
    l = e.length;
    for (i = 0; i < l; i++) {
      e[i].appendChild(this._htmlElement);
    }
  } else {
    new octFAH.util.HTML(element).append(this);
  }

  return this;
};

/**
 * Get/Set Attribute
 *
 * @param key   {string}
 * @param [val] {string}
 *
 * @return {octFAH.util.HTML|string}
 * @public
 */
octFAH.util.HTML.prototype.attribute = function (key, val) {
  if (typeof val === "undefined") {
    return this._htmlElement.getAttribute(key);
  }

  this._htmlElement.setAttribute(key, val);

  return this;
};

/**
 * Set Attributes
 *
 * @param vals {object}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.attributes = function (vals) {
  var a;

  for (a in vals) {
    if (!vals.hasOwnProperty(a)) {
      continue;
    }

    this._htmlElement.setAttribute(a, vals[a]);
  }

  return this;
};

/**
 * Add an onChange event handler
 *
 * @param func {Function}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.change = function (func) {
  this._htmlElement.addEventListener("change", func);
  return this;
};

/**
 * Add an onClick event handler/ Fire Click Event
 *
 * @param [f] {Function}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.click = function (f) {
  if (!f) {this._htmlElement.click();} else {this._htmlElement.addEventListener("click", f);}
  return this;
};

/**
 * Get/Set Inner HTML
 *
 * @param h {string}
 *
 * @returns {string|octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.html = function (h) {
  if (typeof h === "undefined") {return this._htmlElement.innerHTML;}
  this._htmlElement.innerHTML = h;
  return this;
};

/**
 * Add an onInput event handler
 *
 * @param func {Function}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.input = function (func) {
  this._htmlElement.addEventListener("input", func);
  return this;
};

/**
 * Check whether or not a given element matches a query selector
 *
 * @param selector {string}
 * @param ref      {Element}
 *
 * @returns {boolean}
 * @public
 */
octFAH.util.HTML.prototype.matches = function (selector, ref) {
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
 * Locate Parent Node by Query String
 *
 * @param search {string}
 *
 * @return {octFAH.util.HTML|null}
 * @public
 */
octFAH.util.HTML.prototype.parent = function (search) {
  var parent, i;

  parent = this._htmlElement.parentNode;

  for (i = 0; i < 300; i++) {
    if (this.matches(search, parent)) {
      return new octFAH.util.HTML(parent);
    }

    parent = parent.parentNode;
  }

  return null;
};

/**
 * Apply Style to element
 *
 * @param style {object}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.util.HTML.prototype.style = function (style) {
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
};

/**
 *
 * @param [value] {string}
 * @returns {string|octFAH.util.HTML}
 *
 * @public
 */
octFAH.util.HTML.prototype.value = function (value) {
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
};