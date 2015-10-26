/**
 * Message Page Controller
 *
 * @namespace octFAH.controller.MessageController
 * @augments octFAH.controller.Controller
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.2
 * @since   0.4
 *
 * @param app {octFAH.app.Application|Application}
 *
 * @constructor
 */
octFAH.controller.MessageController = function (app) {
  octFAH.controller.Controller.call(this, app);

  /**
   * Selected Watcher URLs
   *
   * @type {string[]}
   *
   * @private
   */
  this._selectedWatchers = [];

  /**
   * Selected Fav Notice URLs
   *
   * @type {string[]}
   *
   * @private
   */
  this._selectedFavs = [];

  /**
   * Watchers Shout Form
   *
   * @type {octFAH.component.WatchShoutForm}
   *
   * @private
   */
  this._wShoutForm = null;

  /**
   * New Favorite Shout Form
   *
   * @type {octFAH.component.FavShoutForm}
   *
   * @private
   */
  this._fShoutForm = null;

  /**
   * Parent Form for new Watchers
   *
   * @type {Element}
   *
   * @private
   */
  this._watchesForm = null;

  /**
   * Message Type (ENUM)
   *
   * @type {object}
   * @private
   */
  this._messageType = Object.create(
    null,
    {
      /** @returns {int} */ get WATCH() {return 0;},
      /** @returns {int} */ get FAVORITE() {return 1;}
      ///** @returns {int} */ get COMMENT()  {return 2;},
      ///** @returns {int} */ get JORNAL()   {return 3;}
    }
  );

  /**
   * Outgoing Get Requests
   *
   * @type {int}
   *
   * @private
   */
  this._outGets = 0;

  /**
   * Outgoing Put Requests
   *
   * @type {int}
   *
   * @private
   */
  this._outPosts = 0;

  this._charLimit = 222;

  /**
   * Parent form for new Favorites
   *
   * @type {Element}
   *
   * @private
   */
  this._favsForm = null;

  /**
   * Current running type.
   *
   * -1 if none.
   *
   * @type {int}
   * @private
   */
  this._runningType = -1;

  /**
   * @type {object}
   *
   * @private
   */
  this._collected = {};
};

octFAH.controller.MessageController.prototype = Object.create(
  octFAH.controller.Controller.prototype,
  {
    get messageType() {return this._messageType;},

    /**
     * Initialize Message Page Controller Elements
     *
     * @public
     * @override
     */
    init: function () {
      var self = this;

      this._initWatchForm();
      this._initFavForm();

      try {
        document.getElementById("messages-form").addEventListener(
          "click",
          function () {
            self._fetchSelected();

            if (self._wShoutForm instanceof octFAH.component.WatchShoutForm) {
              self._wShoutForm.setSelCount(self._selectedWatchers.length);
            }

            if (self._fShoutForm instanceof octFAH.component.FavShoutForm) {
              self._fShoutForm.setSelCount(self._selectedFavs.length);
            }
          }
        );
      } catch (err) {}
    },

    /**
     * @public
     * @override
     */
    run: function () {this._modUI();},

    /**
     *
     * @param type {int}
     * @returns {Function}
     * @private
     */
    _submitShouts: function (type) {
      var arr, m, self;

      self = this;
      m    = this.messageType;
      switch (type) {
        case m.WATCH:
          this._runningType = m.WATCH;
          arr               = this._selectedWatchers;
          break;
        case m.FAVORITE:
          this._runningType = m.FAVORITE;
          arr               = this._selectedFavs;
          break;
        default:
          arr = [];
      }

      return function () {
        var i, l, d;

        l = arr.length;

        for (i = 0; i < l; i++) {
          try {
            d = self._fetchData(arr[i]);

            self._collected[d.name] = d;
          } catch (err) {

          }
        }

        self._wShoutForm.hide();
      };
    },

    /**
     * Initialize New Watchers Mass Shout Form
     *
     * @private
     */
    _initWatchForm: function () {
      this._watchesForm = document.getElementById("messages-watches");

      if (!(this._watchesForm instanceof Element)) {return;}

      this._wShoutForm = new octFAH.component.WatchShoutForm(this._app);
      this._wShoutForm.getSendButton()
        .addEventListener("click", this._submitShouts(this.messageType.WATCH));
    },

    /**
     * Initialize New Favorites Mass Shout Form
     *
     * @private
     */
    _initFavForm: function () {
      this._favsForm = document.getElementById("messages-favorites");

      if (!(this._favsForm instanceof Element)) {return;}

      this._fShoutForm = new octFAH.component.FavShoutForm(this._app);
      this._fShoutForm.getSendButton()
        .addEventListener("click", this._submitShouts(this.messageType.FAVORITE));

    },

    /**
     * Fetch Selected Notifications
     *
     * @private
     */
    _fetchSelected: function () {
      var i, wat, fav, ht;

      wat = this._watchesForm.querySelectorAll("table input:checked");
      fav = this._favsForm.querySelectorAll("table input:checked");

      ht = new Array(wat.length);
      for (i = 0; i < wat.length; i++) {
        ht[i] = this._app.build(wat[i]).parent("table").element().querySelector("a").getAttribute("href");
      }
      this._selectedWatchers = ht;

      // ht is an object to prevent duplicates caused by multiple favorite
      // notifications from one user.
      ht = {};
      for (i = 0; i < fav.length; i++) {
        ht[this._app.build(fav[i]).parent("table").element().querySelector("a").getAttribute("href")] = 0;
      }
      this._selectedFavs = Object.keys(ht);
    },

    /**
     * Make needed alterations to the Messages page
     *
     * @private
     */
    _modUI: function () {
      var watchControls, u, favControls;

      u = this._app.htmlUtil;

      // This Element is only present on the page if there are new watch
      // notifications.
      if (this._watchesForm) {
        watchControls = this._watchesForm.querySelector("li.section-controls");

        watchControls.insertBefore(
          this._app.build(u.makeButton("Mass Shout Selected", this._events.showShoutWatchDiv))
            .addClass("button")
            .element(),
          watchControls.querySelector("input.remove")
        );
      }

      // This element is only present on the page if there are new fav
      // notifications.
      if (this._favsForm) {
        favControls = this._favsForm.querySelector("li.section-controls");

        favControls.insertBefore(
          this._app.build(u.makeButton("Mass Shout Selected", this._events.showShoutFavDiv))
            .addClass("button")
            .element(),
          favControls.querySelector("input.remove")
        );
      }
    },

    /**
     * Remove Selected Notifications
     *
     * @private
     */
    _removeSelected: function () {
      switch (this._runningType) {
        case this.messageType.WATCH:
          this._watchesForm.querySelector("input.remove").click();
          break;
        case this.messageType.FAVORITE:
          this._favsForm.querySelector("input.remove").click();
          break;
      }
    },

    /**
     * Fetch Data
     *
     * Makes a GET request to the provided user's page in an attempt to gather the
     * needed data to auto submit a shout.
     *
     * @param url {string}
     *
     * @returns {{key: string, action: string, name: string}|*}
     *
     * @private
     */
    _fetchData: function (url) {
      var req, data;

      data = {key: "", action: "shout", name: ""};

      req              = new XMLHttpRequest();
      req.open("GET", url);
      req.responseType = "document";
      req.addEventListener("load", this._parseForKey(req, data));
      req.addEventListener("abort", this._subOutGets);
      req.addEventListener("error", this._subOutGets);
      this._outGets++;
      req.send();

      return data;
    },

    _subOutGets: function () {
      this._outGets--;
      this._send();
    },

    _subOutPosts: function () {
      this._outPosts--;

      if (this._outPosts < 1) {
        this._removeSelected();
      }
    },

    /**
     * Parse Page Content for Key data.
     *
     * Sifts through the User page HTML to find the data required to make a
     * shout post.
     *
     * @param req  {XMLHttpRequest}
     * @param data {{key: string, action: string, name: string}}
     *
     * @returns {Function}
     */
    _parseForKey: function (req, data) {
      return function () {
        var el;
        try {
          el          = req.responseXML.getElementById("JSForm");
          data.key    = el.querySelector("input[name=key]").getAttribute("value");
          data.name   = el.querySelector("input[name=name]").getAttribute("value");
          data.action = "shout";
        } catch (e) {

        } finally {
          this._subOutGets();
        }
      };
    },

    _send: function () {
      var i, text, temp;

      if (this._outGets !== 0) {
        return;
      }

      text = this._wShoutForm.getShoutTextElement().value;

      for (i in this._collected) {
        if (!this._collected.hasOwnProperty(i)) {
          continue;
        }
        temp = this._collected[i];

        if (!temp.name || !temp.action || !temp.key) {
          continue;
        }

        this._events.submitShout(temp.key, temp.name, temp.action, text);
      }
    },


    _events: {
      showShoutFavDiv: function () {
        var self = this;

        return function () {
          self._fShoutForm.show();
        };
      },

      /**
       * Show the Shout to Watchers div
       */
      showShoutWatchDiv: function () {
        var self = this;

        return function () {
          self._wShoutForm.show();
        };
      },

      /**
       * Submit A Shout
       *
       * @param key    {String}
       * @param name   {String}
       * @param action {String}
       * @param shout  {String}
       * @param [func] {Function}
       */
      submitShout: function (key, name, action, shout, func) {
        var self = this;

        return function () {
          var post;

          post = new octFAH.http.PostRequest();
          post.setUrl(octFAH.app.Config.userPage + name);
          post.setHeader("Content-type", "application/x-www-form-urlencoded")
            .setData(
            "action=" + action + "&key=" + key + "&name=" + name + "&shout=" + shout + "&chars_left=" +
            (self._charLimit - shout.length).toString()
          );

          if (func) {
            post.onAny(func);
          }

          post.onAny(self._subOutPosts);
          post.send();
          this._outPosts++;
        };
      }
    }
  }
);