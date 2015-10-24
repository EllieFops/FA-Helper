/**
 * Browse Page Module
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.module
 */
octFAH.module.BrowseModule = (function ()
{
  "use strict";

  /**
   * @type {octFAH.core.Application|Application}
   */
  var _app;

  /**
   * @type {octFAH.component.HoverView}
   */
  var _hoverView;

  /**
   * Browse Page Manager
   *
   * @param app {octFAH.core.Application|Application}
   *
   * @constructor
   */
  function BrowseModule(app)
  {
    _app = app;
    _hoverView = new octFAH.component.HoverView(_app);
  }

  return BrowseModule;
})();