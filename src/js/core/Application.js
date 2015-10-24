/**
 * FAHelper Core Application
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.core
 */
octFAH.core.Application = (function () {
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
   * @type {octFAH.core.Application|Application}
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
   * Fur Affinity Helper
   *
   * @constructor
   */
  function Application() {
    _location    = window.location.href;
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

    init(this);
  }

  /**
   * Initialize Application
   *
   * @param context {Application}
   */
  function init(context) {
    updateSettings(context);
    getModule();
    _settingsMenu = new octFAH.component.SettingsMenu(_self);
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
  Application.prototype.getSettings = function () {
    return _settings;
  };

  /**
   * Push Settings To Browser Storage
   */
  Application.prototype.pushSettings = function () {
    _storage.pushValue("octFASettings", _settings);
  };

  /**
   * Get HTML Helper Utility
   *
   * @returns {octFAH.util.HTMLUtils|HTMLUtils}
   */
  Application.prototype.getHTMLUtil = function () {
    return _htmlUtil;
  };

  /**
   * Get General Helper Utility
   *
   * @returns {octFAH.util.Helpers|Helpers}
   */
  Application.prototype.getHelperUtil = function () {
    return _helperUtil;
  };

  /**
   * Determine which module should be loaded for the current page and load
   * that module.
   */
  function getModule() {
    var c, m;

    c = octFAH.core.Config;
    m = octFAH.module;

    if (_location.indexOf(c.subPage) !== -1) {
      _module = new m.SubmissionModule(_self);
    } else if (_location.indexOf(c.browsePage) !== -1) {
      _module = new m.BrowseModule(_self);
    } else if (_location.indexOf(c.searchPage) !== -1) {
      _module = new m.SearchModule(_self);
    } else if (_location.indexOf(c.userPage) !== -1) {
      //new UserPageModule(_self);
    } else if (_location.indexOf(c.watchesPage) !== -1) {
      _module = new m.MessageModule(_self);
    }
  }

  /**
   * Make Submission Link
   *
   * @param i {int}
   * @returns {string}
   */
  Application.prototype.makeArtLink = function (i) {
    return octFAH.core.Config.viewPage + i;
  };

  /**
   * Open Submission In Background Tab
   *
   * @param link {string}
   */
  Application.prototype.openArtTab = function (link) {
    _browserUtil.makeNewTab(link, false);
  };

  /**
   * Get the current URL
   *
   * @returns {string}
   */
  Application.prototype.getLocation = function () {
    return _location;
  };

  /**
   * Fill any gaps in the settings object left from updates.
   *
   * @param self {Application}
   */
  function updateSettings(self) {
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
  Application.prototype.getHelperUtil = function () {
    return _helperUtil;
  };

  /**
   * HTML Element helper
   *
   * @param element(string|Element)
   *
   * @return {octFAH.util.HTML|HTML}
   */
  Application.prototype.wrap = function (element) {
    return new octFAH.util.HTML(element);
  };

  return Application;
}());