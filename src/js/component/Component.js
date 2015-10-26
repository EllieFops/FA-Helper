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

octFAH.component.Component.prototype = Object.create(
  Object.prototype,
  {
    /**
     * Show This Component
     *
     * @public
     *
     * @return {octFAH.component.Component|Component}
     */
    show: function () {
      this._htmlElement.style.display = "block";
      return this;
    },

    /**
     * Hide this component
     *
     * @public
     *
     * @returns {octFAH.component.Component|Component}
     */
    hide: function () {
      this._htmlElement.style.display = "none";
      return this;
    },

    /**
     * Update this component's position relative to the top and left of the
     * screen.
     *
     * @public
     *
     * @param top  {int}
     * @param left {int}
     *
     * @returns {octFAH.component.Component|Component}
     */
    topLeft: function (top, left) {
      this._htmlElement.style.top  = top.toString() + "px";
      this._htmlElement.style.left = left.toString() + "px";

      return this;
    },

    /**
     * Update this component's position relative to the top and right of the
     * screen.
     *
     * @public
     *
     * @param top   {int}
     * @param right {int}
     *
     * @returns {octFAH.component.Component|Component}
     */
    topRight: function (top, right) {
      this._htmlElement.style.top   = top.toString() + "px";
      this._htmlElement.style.right = right.toString() + "px";

      return this;
    },

    /**
     * Update this component's position relative to the bottom and left of the
     * screen.
     *
     * @public
     *
     * @param bottom {int}
     * @param left   {int}
     *
     * @returns {octFAH.component.Component|Component}
     */
    bottomLeft: function (bottom, left) {
      this._htmlElement.style.bottom = bottom.toString() + "px";
      this._htmlElement.style.left   = left.toString() + "px";

      return this;
    },

    /**
     * Update this component's position relative to the bottom and right of the
     * screen.
     *
     * @public
     *
     * @param bottom {int}
     * @param right  {int}
     *
     * @returns {octFAH.component.Component|Component}
     */
    bottomRight: function (bottom, right) {
      this._htmlElement.style.bottom = bottom.toString() + "px";
      this._htmlElement.style.right  = right.toString() + "px";

      return this;
    },

    /**
     * Get the backing element for this component.
     *
     * @public
     *
     * @returns {HTMLElement}
     */
    element: function () {return this._htmlElement;}
  }
);
