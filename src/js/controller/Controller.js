/**
 * Controller
 *
 * @namespace octFAH.controller.Controller
 *
 * @author Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.5
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.controller.Controller = function (app) {
  /**
   * Application
   *
   * @type {octFAH.app.Application}
   * @protected
   */
  this._app = app;
};

octFAH.controller.Controller.prototype = Object.create(
  Object.prototype,
  {
    _init: function () {},
    _run:  function () {}
  }
);