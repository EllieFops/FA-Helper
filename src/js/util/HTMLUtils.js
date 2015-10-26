/**
 * HTML Utilities
 *
 * @namespace octFAH.util.HTMLUtils
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

octFAH.util.HTMLUtils.prototype = Object.create(
  Object.prototype,
  {
    /**
     * Create an Input Button
     *
     * @param text    {string}
     * @param [click] {Function}
     *
     * @return {HTMLElement}
     */
    makeButton: function (text, click) {
      var el = this._app.build("input").attribute("type", "button").value(text);
      if (click) {el.click(click);}
      return el.element;
    },

    /**
     * Make a CheckBox input
     *
     * @param [name]    {string}
     * @param [value]   {string|int}
     * @param [checked] {boolean}
     *
     * @returns {Element}
     */
    makeCheckBox: function (name, value, checked) {
      var check = this._app.build("input").attribute("type", "checkbox");

      if (name)    {check.attribute("name",    name);}
      if (value)   {check.attribute("value",   value);}
      if (checked) {check.attribute("checked", "checked");}

      return check.element;
    },

    /**
     * Make an HTML Option element.
     *
     * @param val  {string|int} Element Value
     * @param text {string}     Element Text
     *
     * @returns {Element}
     */
    makeSelectOption: function (val, text) {return this._app.build("option").value(val).html(text).element;},

    /**
     * Make A Label Containing an Element
     *
     * @param text      {String}      Label Text
     * @param element   {HTMLElement} Element to wrap
     * @param [before]  {boolean}     Place text before element
     *
     * @returns {Element}
     */
    makeWrapperLabel: function (text, element, before) {
      var span;

      before = (typeof before === "undefined") ? true : before;

      span  = this._app.build("span").html(text);

      return this._app.build("label").append(before ? [span, element] : [element, span]).element;
    },

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
    jsonToHTML: function (json) {
      var e, t;

      t = this._app.build(json.type);

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
        t.element.innerHTML = json.text;
      }

      if (json.children && typeof json.children === "object") {
        for (e in json.children) {
          if (!json.children.hasOwnProperty(e)) {
            continue;
          }

          if (json.children[e] instanceof Element) {
            t.element.appendChild(json.children[e]);
          } else {
            t.element.appendChild(this.jsonToHTML(json.children[e]));
          }
        }
      }

      return t.element();
    }

  }
);

