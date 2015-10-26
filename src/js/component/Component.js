/**
 * UI Component
 *
 * Basic UI Component Element
 *
 * @namespace octFAH.component.Component
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.3
 *
 * @param app     {octFAH.app.Application}
 * @param element {Element}
 *
 * @constructor
 */
octFAH.component.Component = function (app, element) {

  /**
   * Component Base Element
   *
   * @type {Element}
   * @protected
   */
  this._htmlElement = element;

  /**
   * Application
   *
   * @type {octFAH.app.Application}
   * @protected
   */
  this._app = app;
};

octFAH.component.Component.prototype = Object.create(Object.prototype);

/**
 * Show This Component
 *
 * @return {octFAH.component.Component}
 * @public
 */
octFAH.component.Component.prototype.show = function () {
  this._htmlElement.style.display = "block";
  return this;
};

/**
 * Hide this component
 *
 * @returns {octFAH.component.Component}
 * @public
 */
octFAH.component.Component.prototype.hide = function () {
  this._htmlElement.style.display = "none";
  return this;
};

/**
 * Update this component's position relative to the top and left of the
 * screen.
 *
 * @param top  {int}
 * @param left {int}
 *
 * @returns {octFAH.component.Component}
 * @public
 */
octFAH.component.Component.prototype.topLeft = function (top, left) {
  this._htmlElement.style.top  = top.toString() + "px";
  this._htmlElement.style.left = left.toString() + "px";

  return this;
};

/**
 * Update this component's position relative to the top and right of the
 * screen.
 *
 * @param top   {int}
 * @param right {int}
 *
 * @returns {octFAH.component.Component}
 * @public
 */
octFAH.component.Component.prototype.topRight = function (top, right) {
  this._htmlElement.style.top   = top.toString() + "px";
  this._htmlElement.style.right = right.toString() + "px";

  return this;
};

/**
 * Update this component's position relative to the bottom and left of the
 * screen.
 *
 * @param bottom {int}
 * @param left   {int}
 *
 * @returns {octFAH.component.Component}
 * @public
 */
octFAH.component.Component.prototype.bottomLeft = function (bottom, left) {
  this._htmlElement.style.bottom = bottom.toString() + "px";
  this._htmlElement.style.left   = left.toString() + "px";

  return this;
};

/**
 * Update this component's position relative to the bottom and right of the
 * screen.
 *
 * @param bottom {int}
 * @param right  {int}
 *
 * @returns {octFAH.component.Component}
 * @public
 */
octFAH.component.Component.prototype.bottomRight = function (bottom, right) {
  this._htmlElement.style.bottom = bottom.toString() + "px";
  this._htmlElement.style.right  = right.toString() + "px";

  return this;
};

/**
 * Get the backing element for this component.
 *
 * @public
 *
 * @returns {HTMLElement}
 */
octFAH.component.Component.prototype.getElement = function () {return this._htmlElement;};
