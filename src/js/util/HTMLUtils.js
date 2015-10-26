/**
 * HTML Utilities
 *
 * @namespace octFAH.util.HTMLUtils
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
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
      var el = document.createElement("input");
      el.setAttribute("type", "button");
      el.setAttribute("value", text);

      if (click) {
        el.addEventListener("click", click);
      }

      return el;
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
    },

    /**
     * Make an HTML Option element.
     *
     * @param val  {string|int} Element Value
     * @param text {string}     Element Text
     *
     * @returns {Element}
     */
    makeSelectOption: function (val, text) {
      var o       = document.createElement("option");
      o.setAttribute("value", val);
      o.innerHTML = text;
      return o;
    },

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
      var label, span;
      before = (typeof before === "undefined") ? true : before;

      label = document.createElement("label");
      span  = document.createElement("span");

      span.innerHTML = text;
      label.appendChild(before ? span : element);
      label.appendChild(before ? element : span);

      return label;
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

