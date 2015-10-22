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
    _location,
    _htmlUtil,
    _helperUtil,
    _settings,
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
    _settings   = GM_getValue("octFASettings", _defSet);
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
    new SettingsMenuManager(_self);
  }

  /**
   * Get Application Utils
   *
   * @returns {Utils}
   */
  Application.prototype.getUtil = function ()
  {
    return _utils;
  };

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
    GM_setValue('octFASettings', _settings);
  };

  /**
   * Determine which module should be loaded for the current page and load
   * that module.
   */
  function getModule()
  {
    var f = FAHConfig;
    if (_location.indexOf(f.subPage) !== -1) {
      new SubmissionManager(_self);
    } else if (_location.indexOf(f.browsePage) !== -1) {
      new BrowseModule(_self);
    } else if (_location.indexOf(f.searchPage) !== -1) {
      new SearchManager(_self);
    } else if (_location.indexOf(f.userPage) !== -1) {
      new UserPageManager(_self);
    } else if (_location.indexOf(f.watchesPage) !== -1) {
      new MessageManager(_self);
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
    return FAHConfig.viewPage + i;
  };

  /**
   * Open Submission In Background Tab
   *
   * @param link {string}
   */
  Application.prototype.openArtTab = function (link)
  {
    GM_openInTab(link, false);
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

      if (typeof _settings[key] == "undefined") {
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
          console.log(c);
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
