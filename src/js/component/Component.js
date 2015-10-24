/**
 * UI Component
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.component
 */
octFAH.component.Component = (function ()
{
  "use strict";

  var _app;

  /**
   * UI Component
   *
   * @param app     {Application}
   * @param element {HTMLElement}
   *
   * @constructor
   */
  function Component(app, element)
  {
    _app          = app;
    this._element = element;
  }

  /**
   * Show This Component
   *
   * @return {octFAH.component.Component|Component}
   */
  Component.prototype.show = function ()
  {
    this._element.style.display = "block";

    return this;
  };

  /**
   * Hide this component
   *
   * @returns {octFAH.component.Component|Component}
   */
  Component.prototype.hide = function ()
  {
    this._element.style.display = "none";

    return this;
  };

  /**
   * Update this component's position relative to the top and left of the
   * screen.
   *
   * @param top  {int}
   * @param left {int}
   *
   * @returns {octFAH.component.Component|Component}
   */
  Component.prototype.topLeft = function (top, left)
  {
    this._element.style.top  = top.toString() + "px";
    this._element.style.left = left.toString() + "px";

    return this;
  };

  /**
   * Update this component's position relative to the top and right of the
   * screen.
   *
   * @param top   {int}
   * @param right {int}
   *
   * @returns {octFAH.component.Component|Component}
   */
  Component.prototype.topRight = function (top, right)
  {
    this._element.style.top   = top.toString() + "px";
    this._element.style.right = right.toString() + "px";

    return this;
  };

  /**
   * Update this component's position relative to the bottom and left of the
   * screen.
   *
   * @param bottom {int}
   * @param left   {int}
   *
   * @returns {octFAH.component.Component|Component}
   */
  Component.prototype.bottomLeft = function (bottom, left)
  {
    this._element.style.bottom = bottom.toString() + "px";
    this._element.style.left   = left.toString() + "px";

    return this;
  };

  /**
   * Update this component's position relative to the bottom and right of the
   * screen.
   *
   * @param bottom {int}
   * @param right  {int}
   *
   * @returns {octFAH.component.Component|Component}
   */
  Component.prototype.bottomRight = function (bottom, right)
  {
    this._element.style.bottom = bottom.toString() + "px";
    this._element.style.right  = right.toString() + "px";

    return this;
  };

  /**
   * Get the backing element for this component.
   *
   * @returns {HTMLElement}
   */
  Component.prototype.element = function ()
  {
    return this._element;
  };

  return Component;
})();