/**
 * Search Page Module
 *
 * @namespace octFAH.controller.SearchController
 * @augments octFAH.controller.Controller
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.2
 * @since   0.1
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.controller.SearchController = function (app) {
  /**
   * @type {octFAH.component.HoverView}
   */
  this._hoverView = null;

  octFAH.controller.Controller.call(this, app);
};

octFAH.controller.SearchController.prototype = Object.create(octFAH.controller.Controller.prototype);

/**
 * @override
 * @public
 */
octFAH.controller.SearchController.prototype.init = function () {
  this._hoverView = new octFAH.component.HoverView(this._app);
};