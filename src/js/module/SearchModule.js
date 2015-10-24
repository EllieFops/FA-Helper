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
octFAH.module.SearchModule = (function () {
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
   * Search Page Manager
   *
   * @param app {octFAH.core.Application|Application}
   *
   * @constructor
   */
  function SearchModule(app) {
    _app       = app;
    _hoverView = new octFAH.component.HoverView(_app);
  }

  return SearchModule;
})();