// ==UserScript==
// @name         L-E's FA Helper
// @version      0.2
// @description  Useful tools to improve your FA experience.
// @author       Elizabeth Harper <elliefops@gmail.com>
// @match        https://www.furaffinity.net/*
// @supportURL   https://github.com/EllieFops/FA-Helper/issues
// @homepage     https://github.com/EllieFops/FA-Helper
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function ()
{
  var
    App,
    SubmissionManager,
    BrowseManager,
    SearchManager,
    SettingsMenuManager,
    Utils,
    HoverView,
    FAHConfig
  ;

  FAHConfig = {
    viewPage:    "https://www.furaffinity.net/view/",
    subPage:     "https://www.furaffinity.net/msg/submissions/",
    basePage:    "https://www.furaffinity.net/",
    browsePage:  "https://www.furaffinity.net/browse/",
    searchPage:  "https://www.furaffinity.net/search/",
    previewPage: "https://t.facdn.net/"
  };

  // ==========================================================================
  // FA Helper Core
  // ==========================================================================

  App = (function ()
  {
    var
      _location,
      _utils,
      _settings,
      _self,
      _defSet
    ;

    /**
     * Fur Affinity Helper
     *
     * @constructor
     */
    function App()
    {
      _location = window.location.href;
      _utils    = new Utils(this);
      _settings = GM_getValue("octFASettings", _defSet);
      _self     = this;
      _defSet   = {
        previewSize:  400,
        showPreviews: true
      };

      init();
    }

    function init ()
    {
      getModule();
      new SettingsMenuManager(_self);
    }

    /**
     * Get App Utils
     *
     * @returns {Utils}
     */
    App.prototype.getUtil = function() {return _utils;};

    /**
     * Get App Settings
     *
     * @returns {Object}
     */
    App.prototype.getSettings = function() {return _settings;};

    /**
     * Push Settings To Browser Storage
     */
    App.prototype.pushSettings = function(){GM_setValue('octFASettings', _settings);};


    function getModule ()
    {
      var f = FAHConfig;
      if (_location.indexOf(f.subPage) === 0) {
        new SubmissionManager(_self);
      } else if (_location.indexOf(f.browsePage) === 0) {
        new BrowseManager(_self);
      } else if (_location.indexOf(f.searchPage) === 0) {
        new SearchManager(_self);
      }
    }

    /**
     * Make Submission Link
     *
     * @param i {int}
     * @returns {string}
     */
    App.prototype.makeArtLink = function (i)
    {
      return FAHConfig.viewPage + i;
    };

    /**
     * Open Submission In Background Tab
     *
     * @param link
     */
    App.prototype.openArtTab = function (link)
    {
      GM_openInTab(link, false);
    };

    return App;
  })();

  // ==========================================================================
  // Submissions View Manager
  // ==========================================================================

  SubmissionManager = (function ()
  {
    var
      _app,
      _form,
      _self
    ;

    /**
     * Fur Affinity Submissions Page Manager
     *
     * @param app {App}
     *
     * @constructor
     */
    function SubmissionManager(app)
    {
      _app  = app;
      _form = document.getElementById("messages-form");
      _self = this;

      init();
    }

    function init()
    {
      new HoverView(_app);
      modSubmissionUI();
    }

    function modSubmissionUI ()
    {
      var forms;
      forms = document.querySelectorAll('.actions');
      for (var i = 0; i < forms.length; i++) {
        forms[i].appendChild(makeTabsButton());
      }
    }

    /**
     * Make "Load In Tabs" Button
     *
     * @returns {Element}
     */
    function makeTabsButton ()
    {
      var button = document.createElement("input");
      button.setAttribute("type", "button");
      button.setAttribute("value", "Load In Tabs");
      button.setAttribute("class", "octoTabsButton button");
      button.addEventListener("click", handleTabsButton);
      return button;
    }

    /**
     * Handle "Load In Tabs" Button Click
     */
    function handleTabsButton ()
    {
      var boxes = _form.querySelectorAll('input[type=checkbox]:checked');
      var id, i;

      for (i = 0; i < boxes.length; i++) {
        id = parseInt(boxes[i].getAttribute("value"));
        if (id > 0) {
          _app.openArtTab(_app.makeArtLink(id));
        }
      }
    }

    return SubmissionManager;
  })();

  // ==========================================================================
  // Image Hover View
  // ==========================================================================

  HoverView = (function ()
  {
    var
      _app,
      _img,
      _pane,
      _settings
    ;

    function HoverView(app)
    {
      _app      = app;
      _pane     = document.createElement("DIV");
      _img      = document.createElement("IMG");
      _settings = app.getSettings();

      init();
    }

    function handleMouseOver (e)
    {
      if (!_settings.showPreviews) {return;}
      _pane.style.display = "block";
      _img.setAttribute("src", e.target.getAttribute("src").replace("@200", "@" + _settings.previewSize.toString()));
    }

    function handleMouseMove (e)
    {
      if (!_settings.showPreviews) {return;}

      var x, y, i;
      i = _img.getBoundingClientRect();

      x = e.clientX + window.scrollX + 30;
      if (x + i.width > window.innerWidth) {
        x = e.clientX + window.scrollX - i.width - 30;
      }

      y = (e.clientY - i.height / 2) + window.scrollY;

      if (y < window.scrollY) {
        y += window.scrollY - y;
      } else if (y + i.height > window.innerHeight + window.scrollY) {
        y -= y + i.height - (window.innerHeight + window.scrollY);
      }

      _pane.style.top = y.toString() + "px";
      _pane.style.left = x.toString() + "px";
    }

    function handleMouseOut(){_pane.style.display="none";}

    function init ()
    {

      // Init Elements
      _pane.appendChild(_img);
      _pane.style.display = "none";
      _pane.style.position = "absolute";
      _pane.style.zIndex = 1000;
      _pane.style.border = "2px solid pink";
      document.querySelector("body").appendChild(_pane);

      // Init Handlers
      var i, a;
      a = document.querySelectorAll("b img");
      for (i = 0; i < a.length; i++) {
        a[i].addEventListener("mouseover", handleMouseOver);
        a[i].addEventListener("mouseout", handleMouseOut);
        a[i].addEventListener("mousemove", handleMouseMove);
      }
    }

    return HoverView;
  })();

  // ==========================================================================
  // Browse Module
  // ==========================================================================

  BrowseManager = (function ()
  {
    var _app;
    function BrowseManager(app) {_app = app;init();}
    function init (){new HoverView(_app);}
    return BrowseManager;
  })();

  // ==========================================================================
  // Search Module
  // ==========================================================================

  SearchManager = (function ()
  {
    var _app;
    function SearchManager(app){_app = app;init();}
    function init(){new HoverView(_app);}
    return SearchManager;
  })();

  // ==========================================================================
  // Settings Menu
  // ==========================================================================

  SettingsMenuManager = (function ()
  {
    var
      _app,
      _div,
      _self
    ;

    /**
     * Settings Menu
     *
     * @param app {App}
     *
     * @constructor
     */
    function SettingsMenu(app)
    {
      _self  = this;
      _app   = app;
      _div   = document.createElement("div");

      init();
    }

    function show (e)
    {
      var s = _div.style;
      var u = _app.getUtil();

      s.padding = u.toPx(5);
      s.top     = u.toPx(e.clientY + 5);
      s.left    = u.toPx(e.clientX - 25);
      s.display = 'block';
    }
    function hide (e)
    {
      var c, i;
      c = e.target;

      for (i = 0; i < 200; i++) {
        if (!(c instanceof HTMLElement)) {break;}
        if (c.getAttribute('class') == 'octMenuBlock' || c.getAttribute('class') == 'octSettingsShow') {return;}

        c = c.parentNode;
      }
      _div.style.display = 'none';
    }
    function previewSizeChange (e) {_app.getSettings().previewSize = e.target.value;_app.pushSettings();}
    function previewToggle (e) {_app.getSettings().showPreviews = e.target.checked;_app.pushSettings();}

    function init ()
    {
      initDiv();
      initForm();
      modUI();
    }

    /**
     * Make Needed Alterations to the Default UI
     */
    function modUI ()
    {
      var el, but, li;
      but = document.createElement('a');

      but.setAttribute('class', 'octSettingsShow');
      but.addEventListener('click', show);

      li = document.createElement('li');
      li.appendChild(but);

      el = document.querySelector("table.block-menu-top ul.dropdown-left li:nth-child(2)");

      if (!el) {
        el = document.querySelector('#nav li:nth-child(4)');
      } else {
        but.style.fontWeight = 'bold';
      }

      but.innerHTML        = 'Helper';
      but.style.cursor     = 'pointer';
      but.style.color      = '#cfcfcf';

      el.parentNode.insertBefore(li, el);
    }

    function initDiv ()
    {
      var s, title, ts;

      s = _div.style;

      _div.setAttribute('class', 'octMenuBlock');

      s.display = "none";
      s.border = "2px solid pink";
      s.position = "fixed";
      s.zIndex = 9001;
      s.backgroundColor = '#383838';

      title = _app.getUtil().makeSpan('FA Helper Settings');
      ts = title.style;

      ts.fontWeight = 'bold';
      ts.fontSize   = '1.2em';
      ts.display    = 'block';
      ts.textAlign  = 'center';
      ts.padding    = '0 20px 10px 20px';

      _div.appendChild(title);
      document.addEventListener('click', hide);

      document.querySelector('body').appendChild(_div);
    }

    function initForm ()
    {
      var form, util, select, i, labels, opt, check;

      util   = _app.getUtil();
      form   = document.createElement('form');
      select = document.createElement('select');
      check  = document.createElement('input');

      form.appendChild(util.makeWrapperLabel('Enable Previews', check));
      form.appendChild(util.makeWrapperLabel('Preview Size', select));

      // Check
      check.setAttribute('type', 'checkbox');
      check.addEventListener('change', previewToggle);

      if (_app.getSettings().showPreviews) {
        check.setAttribute('checked', 'checked');
      }

      // Select
      select.setAttribute('id', 'octPrevSizeSel');
      select.addEventListener('change', previewSizeChange);

      // Select Options
      for (i = 200; i <= 400; i += 100) {
        opt = util.makeSelectOption(i, util.toPx(i));
        if (i == _app.getSettings().previewSize) {
          opt.setAttribute('selected', 'selected');
        }
        select.appendChild(opt);
      }

      // Style Labels
      labels = form.querySelectorAll('label > span');
      for (i = 0; i < labels.length; i++) {
        labels[i].parentNode.style.display = 'block';
        labels[i].parentNode.style.marginBottom = '5px';

        labels[i].style.display  = 'inline-block';
        labels[i].style.padding  = '5px';
        labels[i].style.fontSize = '1.1em';
        labels[i].style.width    = '120px';
      }

      _div.appendChild(form);
    }


    return SettingsMenu;
  })();


  // ==========================================================================
  // Utilities
  // ==========================================================================

  Utils = (function ()
  {
    var
      _app
    ;

    function Utils(app)
    {
      _app = app;
    }

    Utils.prototype.makeSelectOption = function (val, text)
    {
      var o = document.createElement('option');
      o.setAttribute('value', val);
      o.innerHTML = text;
      return o;
    };

    Utils.prototype.toPx = function (i)
    {
      return i.toString() + 'px';
    };

    Utils.prototype.makeSpan = function (text)
    {
      var s = document.createElement('span');
      s.innerHTML = text;
      return s;
    };

    /**
     * Make A Label Containing an Element
     *
     * @param text    {String}      Label Text
     * @param element {HTMLElement} Element to wrap
     * @param [before]  {boolean}     Place text before element
     *
     * @returns {Element}
     */
    Utils.prototype.makeWrapperLabel = function (text, element, before)
    {
      var label, span;
      before = (typeof before == 'undefined') ? true : before;

      label  = document.createElement('label');
      span   = document.createElement('span');

      span.innerHTML = text;
      label.appendChild(before ? span : element);
      label.appendChild(before ? element : span);

      return label;
    };

    return Utils;
  })();

  new App();
})();