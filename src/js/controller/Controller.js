/**
 * Controller
 *
 * @memberof octFAH.controller
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

octFAH.controller.Controller.prototype = Object.create(Object.prototype);

/**
 * @public
 */
octFAH.controller.Controller.prototype.init = function () {};

/**
 * @public
 */
octFAH.controller.Controller.prototype.run = function () {};