/**
 * Browse Page Module
 *
 * @version 1.1
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @augments  octFAH.controller.Controller
 * @namespace octFAH.controller
 */
octFAH.controller.BrowseController = (function ()
{
  "use strict";

  /**
   * @type {octFAH.app.Application|Application}
   */
  var _app;

  /**
   * @type {octFAH.component.HoverView}
   */
  var _hoverView;

  /**
   * Browse Page Manager
   *
   * @param app {octFAH.app.Application|Application}
   *
   * @augments octFAH.controller.Controller
   * @constructor
   */
  function BrowseController(app)
  {
    _app = app;

    octFAH.controller.Controller.call(this, app);
  }

  BrowseController.prototype = Object.create(octFAH.controller.Controller.prototype);

  /**
   * Initialize Controller
   *
   * @override {octFAH.controller.Controller.init}
   */
  BrowseController.prototype.init = function ()
  {
    _hoverView = new octFAH.component.HoverView(_app);
  };

  return BrowseController;
})();