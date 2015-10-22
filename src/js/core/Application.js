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

octFAH.core.Application = (function ()
{
  var
    _browser,
    _location,
    _htmlUtil,
    _helperUtil,
    _module,
    _settings,
    _settingsMenu,
    _storage,
    _self,
    _defSet;

  /**
   * Fur Affinity Helper
   *
   * @constructor
   */
  function Application()
  {
    _location   = window.location.href;
    _htmlUtil   = new octFAH.util.HTMLUtils(this);
    _helperUtil = new octFAH.util.Helpers(this);
    _storage    = new octFAH.util.Storage();
    _browser    = new octFAH.util.Browser();

    _settings   = _storage.fetchValue("octFASettings", _defSet);
    _module     = null;
    _self       = this;
    _defSet     = {
      previewSize:    400,
      showPreviews:   true,
      watchShoutText: "",
      favShoutText:   ""
    };

    init(this);
  }

  /**
   * Initialize Application
   *
   * @param context {Application}
   */
  function init(context)
  {
    updateSettings(context);
    initGlobalListeners();
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
   * Determine which module should be loaded for the current page and load
   * that module.
   */
  function getModule()
  {
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
  Application.prototype.makeArtLink = function (i)
  {
    return octFAH.core.Config.viewPage + i;
  };

  /**
   * Open Submission In Background Tab
   *
   * @param link {string}
   */
  Application.prototype.openArtTab = function (link)
  {
    _browser.makeNewTab(link, false);
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

  function initGlobalListeners()
  {
    document.addEventListener(
      'click', function (e)
      {
        var c, i, a, b;
        c = e.target;

        for (i = 0; i < 200; i++) {
          if (!(c instanceof HTMLElement)) {
            break;
          }
          if (c.classList.contains("octModalContent") || c.classList.contains("octModalShow")) {
            return;
          }

          c = c.parentNode;
        }

        b = document.querySelectorAll(".octModalContent");
        for (a = 0; a < b.length; a++) {
          b[a].style.display = "none";
        }
      }
    );
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

  return Application;
})();
