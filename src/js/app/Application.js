/**
 * FAHelper Core Application
 *
 * @version 1.1
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.app
 */
octFAH.app.Application = (function ()
{
  "use strict";

  /**
   * @type {octFAH.util.Browser|Browser}
   *
   * @private
   * @static
   */
  var _browserUtil;

  /**
   * @type {string}
   *
   * @private
   * @static
   */
  var _browser;

  /**
   * @type {object}
   *
   * @private
   * @static
   */
  var _defSet;

  /**
   * @type {octFAH.util.Helpers|Helpers}
   *
   * @private
   * @static
   */
  var _helperUtil;

  /**
   * @type {octFAH.util.HTMLUtils|HTMLUtils}
   *
   * @private
   * @static
   */
  var _htmlUtil;

  /**
   * @type {string}
   *
   * @private
   * @static
   */
  var _location;

  /**
   * @type {object}
   *
   * @private
   * @static
   */
  var _module;

  /**
   * @type {octFAH.app.Application|Application}
   *
   * @private
   * @static
   */
  var _self;

  /**
   * @type {object}
   *
   * @private
   * @static
   */
  var _settings;

  /**
   * @type {octFAH.component.SettingsMenu}
   *
   * @private
   * @static
   */
  var _settingsMenu;

  /**
   * @type {octFAH.util.Storage|Storage}
   *
   * @private
   * @static
   */
  var _storage;

  /**
   * @type {octFAH.util.Router|Router}
   */
  var _router;

  /**
   * Fur Affinity Helper
   *
   * @constructor
   */
  function Application()
  {
    _location    = window.location.href;
    _router      = new octFAH.util.Router();
    _htmlUtil    = new octFAH.util.HTMLUtils(this);
    _helperUtil  = new octFAH.util.Helpers(this);
    _storage     = new octFAH.util.Storage();
    _browserUtil = new octFAH.util.Browser();
    _browser     = _helperUtil.getBrowserType();
    _defSet      = {
      previewSize:    400,
      showPreviews:   true,
      watchShoutText: "",
      favShoutText:   ""
    };
    _settings    = _storage.fetchValue("octFASettings", _defSet);
    _module      = null;
    _self        = this;

    boot(this);
    init();
    run();
  }

  function boot(app)
  {
    _router.registerRoute("/browse/", new octFAH.controller.BrowseController(app));
    _router.registerRoute("/search/", new octFAH.controller.SearchController(app));
    _router.registerRoute("/msg/submissions/", new octFAH.controller.SubmissionController(app));
    _router.registerRoute("/msg/others/", new octFAH.controller.MessageController(app));

    updateSettings(app);
  }

  /**
   * Initialize Application
   */
  function init()
  {
    _settingsMenu = new octFAH.component.SettingsMenu(_self);
  }

  function run()
  {
    _router.route(window.location.pathname);
  }

  /**
   * Get Application Settings
   *
   * @returns {{
     *   previewSize:    int,
     *   showPreviews:   boolean,
     *   watchShoutText: string,
     *   favShoutText:   string
     * }}
   */
  Application.prototype.getSettings = function ()
  {
    return _settings;
  };

  /**
   * Push Settings To Browser Storage
   */
  Application.prototype.pushSettings = function ()
  {
    _storage.pushValue("octFASettings", _settings);
  };

  /**
   * Get HTML Helper Utility
   *
   * @returns {octFAH.util.HTMLUtils|HTMLUtils}
   */
  Application.prototype.getHTMLUtil = function ()
  {
    return _htmlUtil;
  };

  /**
   * Get General Helper Utility
   *
   * @returns {octFAH.util.Helpers|Helpers}
   */
  Application.prototype.getHelperUtil = function ()
  {
    return _helperUtil;
  };

  /**
   * Get the current URL
   *
   * @returns {string}
   */
  Application.prototype.getLocation = function ()
  {
    return _location;
  };

  /**
   * Get Browser Utility
   *
   * @returns {octFAH.util.Browser|Browser}
   */
  Application.prototype.getBrowserUtil = function ()
  {
    return _browserUtil;
  };

  /**
   * Fill any gaps in the settings object left from updates.
   *
   * @param self {Application}
   */
  function updateSettings(self)
  {
    var update, key;

    update = false;

    for (key in _defSet) {
      if (!_defSet.hasOwnProperty(key)) {
        continue;
      }

      if (typeof _settings[key] === "undefined") {
        update         = true;
        _settings[key] = _defSet[key];
      }
    }

    if (update) {
      self.pushSettings();
    }
  }

  /**
   * Get Helper Utilities
   *
   * @returns {Helpers}
   */
  Application.prototype.getHelperUtil = function ()
  {
    return _helperUtil;
  };

  /**
   * HTML Element helper
   *
   * @param element(string|Element)
   *
   * @return {octFAH.util.HTML|HTML}
   */
  Application.prototype.build = function (element)
  {
    return new octFAH.util.HTML(element);
  };

  return Application;
}());