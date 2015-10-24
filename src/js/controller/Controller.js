/**
 * Controller
 *
 * @version 1.0
 * @since   0.5
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.controller
 */
octFAH.controller.Controller = (function ()
{
  "use strict";

  /**
   *
   * @param app {Application|octFAH.app.Application}
   * @constructor
   */
  function Controller(app)
  {
    /**
     * Application
     *
     * @type {Application|octFAH.app.Application}
     * @private
     */
    this._app = app;
  }

  Controller.prototype.init = function ()
  {
  };
  Controller.prototype.run  = function ()
  {
  };

  return Controller;
}());