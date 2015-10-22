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

  var _app, _element;

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
    _app     = app;
    _element = element;
  }

  Component.prototype.show = function ()
  {
    _element.style.display = "block";
  };

  Component.prototype.hide = function ()
  {
    _element.style.display = "none";
  };

  Component.prototype.topLeft = function (top, left)
  {
    _element.style.top = top.toString() + "px";
    _element.style.left = left.toString() + "px";
  };

  Component.prototype.topRight = function (top, right)
  {
    _element.style.top = top.toString() + "px";
    _element.style.right = right.toString() + "px";
  };

  Component.prototype.bottomLeft = function (bottom, left)
  {
    _element.style.bottom = bottom.toString() + "px";
    _element.style.left = left.toString() + "px";
  };

  Component.prototype.bottomRight = function (bottom, right)
  {
    _element.style.bottom = bottom.toString() + "px";
    _element.style.right = right.toString() + "px";
  };

  Component.prototype.getElement = function()
  {
    return _element;
  };

  return Component;
})();