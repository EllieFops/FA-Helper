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
 * @param app {octFAH.app.Application|Application}
 *
 * @constructor
 */
octFAH.controller.SearchController = function (app) {
  octFAH.controller.Controller.call(this, app);

  /**
   * @type {octFAH.component.HoverView}
   */
  this._hoverView = null;
};

octFAH.controller.SearchController.prototype = Object.create(
  octFAH.controller.Controller.prototype,
  {
    init: function () {this._hoverView = new octFAH.component.HoverView(this._app);}
  }
);