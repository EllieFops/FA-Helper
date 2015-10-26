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

octFAH.app.Application.prototype = Object.create(
  Object.prototype,
  {
    /**
     * Boot Setup
     *
     * @private
     */
    _boot: function () {
      this._router.registerRoute("/browse/", new octFAH.controller.BrowseController(this));
      this._router.registerRoute("/search/", new octFAH.controller.SearchController(this));
      this._router.registerRoute("/msg/submissions/", new octFAH.controller.SubmissionController(this));
      this._router.registerRoute("/msg/others/", new octFAH.controller.MessageController(this));

      this._updateSettings();
    },

    /**
     * Initialize Application
     *
     * @private
     */
    _init: function () {this._settingsMenu = new octFAH.component.SettingsMenu(this);},

    /**
     * Run Application
     *
     * @private
     */
    _run: function () {this._router.route(window.location.pathname);},

    /**
     * Get Application Settings
     *
     * @public
     *
     * @returns {{
     *   previewSize:    int,
     *   showPreviews:   boolean,
     *   watchShoutText: string,
     *   favShoutText:   string
     * }}
     */
    get settings() {return this._settings;},

    /**
     * Push Settings To Browser Storage
     *
     * @public
     */
    pushSettings: function () {this._storage.pushValue("octFASettings", this._settings);},

    /**
     * Get HTML Helper Utility
     *
     * @public
     *
     * @returns {octFAH.util.HTMLUtils}
     */
    get htmlUtil() {return this._htmlUtil;},

    /**
     * Get General Helper Utility
     *
     * @public
     *
     * @returns {octFAH.util.Helpers}
     */
    get helperUtil() {return this._helperUtil;},

    /**
     * Get the current URL
     *
     * @public
     *
     * @returns {string}
     */
    get location() {return this._location;},

    /**
     * Get Browser Utility
     *
     * @public
     *
     * @returns {octFAH.util.Browser}
     */
    get browserUtil() {return this._browserUtil;},

    /**
     * HTML Element helper
     *
     * @public
     *
     * @param element(string|Element)
     *
     * @return {octFAH.util.HTML}
     */
    build: function (element) {return new octFAH.util.HTML(element);},

    /**
     * Fill any gaps in the settings object left from updates.
     *
     * @private
     */
    _updateSettings: function () {
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
    }
  }
);