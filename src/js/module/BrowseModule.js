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
  var _app, _hoverView;

  /**
   * Browse Page Manager
   *
   * @param app {Application}
   *
   * @constructor
   */
  function BrowseModule(app)
  {
    _app = app;
    init();
  }

  /**
   * Initialize Browse Module Elements
   */
  function init()
  {
    _hoverView = new octFAH.component.HoverView(_app);
  }

  return BrowseModule;
})();