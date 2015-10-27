/**
 * HTML Utilities
 *
 * @memberof octFAH.util
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.2
 * @since   0.3
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.util.HTMLUtils = function (app) {
  this._app = app;
};

octFAH.util.HTMLUtils.prototype = Object.create(Object.prototype);

/**
 * Create an Input Button
 *
 * @param text    {string}
 * @param [click] {Function}
 *
 * @return {HTMLElement}
 */
octFAH.util.HTMLUtils.prototype.makeButton = function (text, click) {
  var element = this._app.wrap("<input type='button' value='"+ text + "'>");
  if (click) {element.click(click);}
  return element.getElement();
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
octFAH.util.HTMLUtils.prototype.makeCheckBox = function (name, value, checked) {
  var check = this._app.wrap("<input type=checkbox>");

  if (name) {check.attribute("name", name);}
  if (value) {check.attribute("value", value);}
  if (checked) {check.attribute("checked", "checked");}

  return check.getElement();
};

/**
 * Make an HTML Option element.
 *
 * @param val  {string|int} Element Value
 * @param text {string}     Element Text
 *
 * @returns {Element}
 */
octFAH.util.HTMLUtils.prototype.makeSelectOption = function (val, text) {
  return this._app.wrap("<option>").value(val).html(text).getElement();
};

/**
 * Make A Label Containing an Element
 *
 * @param text      {String}      Label Text
 * @param element   {HTMLElement} Element to wrap
 * @param [before]  {boolean}     Place text before element
 *
 * @returns {Element}
 */
octFAH.util.HTMLUtils.prototype.makeWrapperLabel = function (text, element, before) {
  var span;

  before = (typeof before === "undefined") ? true : before;

  span = this._app.wrap("<span>").html(text);

  return this._app.wrap("<label>").append(before ? [span, element] : [element, span]).getElement();
};

/**
 * JSON To HTML
 *
 * @param json {{
 *   type:       string,
 *   attributes: object,
 *   classes:    string[],
 *   children:   object[],
 *   text:       string
 * }}
 *
 * @return {Element}
 */
octFAH.util.HTMLUtils.prototype.jsonToHTML = function (json) {
  var e, t;

  t = this._app.wrap(json.type);

  if (json.id) {
    t.attribute("id", json.id);
  }

  if (json.attributes && typeof json.attributes === "object") {
    t.attributes(json.attributes);
  }

  if (json.classes && json.classes instanceof Array) {
    t.addClass(json.classes);
  }

  if (json.text) {
    t.getElement().innerHTML = json.text;
  }

  if (json.children && typeof json.children === "object") {
    for (e in json.children) {
      if (!json.children.hasOwnProperty(e)) {
        continue;
      }

      if (json.children[e] instanceof Element) {
        t.getElement().appendChild(json.children[e]);
      } else {
        t.getElement().appendChild(this.jsonToHTML(json.children[e]));
      }
    }
  }

  return t.getElement();
};

/**
 * Apply Style to element
 *
 * @param element {HTMLElement|HTMLElement[]}
 * @param style   {object}
 *
 * @return {HTMLElement|*} Returns first argument only if it was an
 *                         HTMLElement.
 */
octFAH.util.HTMLUtils.prototype.style = function (element, style) {
  var key, css, i;

  if (element instanceof Array) {
    for (i = 0; i < element.length; i++) {
      this.style(element[i], style);
    }

    return null;
  }

  css = element.style;
  for (key in style) {
    if (!style.hasOwnProperty(key)) {
      continue;
    }

    if (typeof css[key] === "undefined") {
      continue;
    }

    css[key] = style[key];
  }

  return element;
};