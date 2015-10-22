/**
 * General Utilities & Helpers
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */

octFAH.util.Helpers = (function ()
{
  var _app;

  /**
   * Helper Utilities
   *
   * @param app {Application}
   *
   * @constructor
   */
  function Helpers(app)
  {
    _app = app;
  }

  /**
   * Integer to px string
   *
   * @param i {int|string}
   *
   * @returns {string}
   */
  Helpers.prototype.toPx = function (i)
  {
    return i.toString() + 'px';
  };

  return Helpers;
})();
