/**
 * Search Page Module
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.module
 */

octFAH.module.SearchModule = (function ()
{
  var _app, _hoverView;

  /**
   * Search Page Manager
   *
   * @param app {Application}
   * @constructor
   */
  function SearchModule(app)
  {
    _app = app;
    init();
  }

  /**
   * Initialize Search Module Elements
   */
  function init()
  {
    _hoverView = new octFAH.component.HoverView(_app);
  }

  return SearchModule;
})();