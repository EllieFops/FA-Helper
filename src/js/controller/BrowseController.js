/**
 * Browse Page Module
 *
 * @namespace octFAH.controller.BrowseController
 * @augments  octFAH.controller.Controller
 *
 * @author Elizabeth Harper
 * @version 1.2
 * @since   0.1
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.controller.BrowseController = function (app) {
  octFAH.controller.Controller.call(this, app);

  /**
   * @type {octFAH.component.HoverView}
   */
  this._hoverView = null;
};

octFAH.controller.BrowseController.prototype = Object.create(
  octFAH.controller.Controller.prototype,
  {
    init: function () {this._hoverView = new octFAH.component.HoverView(this._app);}
  }
);
