/**
 * FAHelper Core Application
 *
 * @namespace octFAH.app.Application
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.2
 * @since   0.1
 *
 * @constructor
 */
octFAH.app.Application = function () {

  /**
   * Current URL
   *
   * @type {string}
   * @private
   */
  this._location = window.location.href;


  /**
   *
   * @type {octFAH.util.Router}
   * @private
   */
  this._router = new octFAH.util.Router();


  /**
   *
   * @type {octFAH.util.HTMLUtils}
   * @private
   */
  this._htmlUtil = new octFAH.util.HTMLUtils(this);


  /**
   *
   * @type {octFAH.util.Helpers}
   * @private
   */
  this._helperUtil = new octFAH.util.Helpers(this);


  /**
   *
   * @type {octFAH.util.Storage}
   * @private
   */
  this._storage = new octFAH.util.Storage();


  /**
   *
   * @type {octFAH.util.Browser}
   * @private
   */
  this._browserUtil = new octFAH.util.Browser();


  /**
   *
   * @type {{name, version}|{name: string, version: number}}
   * @private
   */
  this._browser = this._helperUtil.getBrowserType();


  /**
   *
   * @type {octFAH.component.SettingsMenu}
   * @private
   */
  this._settingsMenu = null;


  /**
   * Default Settings
   *
   * @type {{previewSize: number, showPreviews: boolean, watchShoutText: string, favShoutText: string}}
   * @private
   */
  this._defSet = {
    previewSize:    400,
    showPreviews:   true,
    watchShoutText: "",
    favShoutText:   ""
  };


  /**
   * Current Settings
   *
   * @type {object}
   * @private
   */
  this._settings = this._storage.fetchValue("octFASettings", this._defSet);


  this._boot();
  this._init();
  this._run();
};

/**
 * Push Settings To Browser Storage
 *
 * @public
 */
octFAH.app.Application.prototype.pushSettings = function () {this._storage.pushValue("octFASettings", this._settings);};


/**
 * HTML Element helper
 *
 * @param element {string|Node}
 *
 * @return {octFAH.util.HTML}
 * @public
 */
octFAH.app.Application.prototype.wrap = function (element) {return new octFAH.util.HTML(element);};

/**
 * Get Current URL
 *
 * @returns {string}
 * @public
 */
octFAH.app.Application.prototype.getLocation = function () {return this._location;};

/**
 * HTML Utility
 *
 * @returns {octFAH.util.HTMLUtils}
 * @public
 */
octFAH.app.Application.prototype.getHTMLUtil = function () {return this._htmlUtil;};

/**
 * Browser Utility
 *
 * @returns {octFAH.util.Browser}
 * @public
 */
octFAH.app.Application.prototype.getBrowserUtil = function () {return this._browserUtil;};

/**
 * Get Helper Utility
 *
 * @returns {octFAH.util.Helpers}
 * @public
 */
octFAH.app.Application.prototype.getHelperUtil = function () {return this._helperUtil;};

/**
 * Get Storage Util
 *
 * @returns {octFAH.util.Storage}
 * @public
 */
octFAH.app.Application.prototype.getStorageUtil = function () {return this._storage;};

/**
 * Get Settings
 *
 * @returns {object}
 * @public
 */
octFAH.app.Application.prototype.getSettings = function () {return this._settings;};

/**
 * Boot Setup
 *
 * @private
 */
octFAH.app.Application.prototype._boot = function () {
  this._router.registerRoute("/browse/", new octFAH.controller.BrowseController(this));
  this._router.registerRoute("/search/", new octFAH.controller.SearchController(this));
  this._router.registerRoute("/msg/submissions/", new octFAH.controller.SubmissionController(this));
  this._router.registerRoute("/msg/others/", new octFAH.controller.MessageController(this));

  this._updateSettings();
};

/**
 * Initialize Application
 *
 * @private
 */
octFAH.app.Application.prototype._init = function () {this._settingsMenu = new octFAH.component.SettingsMenu(this);};

/**
 * Run Application
 *
 * @private
 */
octFAH.app.Application.prototype._run = function () {this._router.route(window.location.pathname);};
/**
 * Fill any gaps in the settings object left from updates.
 *
 * @private
 */
octFAH.app.Application.prototype._updateSettings = function () {
  var update, key;

  update = false;

  for (key in this._defSet) {
    if (!this._defSet.hasOwnProperty(key)) {
      continue;
    }

    if (typeof this._settings[key] === "undefined") {
      update              = true;
      this._settings[key] = this._defSet[key];
    }
  }

  if (update) {
    this.pushSettings();
  }
};
