/**
 * Message Page Module
 *
 * @version 1.1
 * @since   0.4
 *
 * @author Elizabeth Harper
 *
 * @augments octFAH.controller.Controller
 * @namespace octFAH.controller
 */
octFAH.controller.MessageController = (function ()
{

  "use strict";

  /**
   * @type {octFAH.app.Application|Application}
   */
  var _app;

  /**
   * @type {int}
   */
  var _charLimit;

  /**
   * Selected Watcher URLs
   *
   * @type {string[]}
   *
   * @private
   * @static
   */
  var _selected = [];

  /**
   * Watchers Shout Form
   *
   * @type {octFAH.component.WatchShoutForm|WatchShoutForm}
   *
   * @private
   * @static
   */
  var _shoutForm = null;

  /**
   * Parent Form Element
   *
   * @type {Element}
   *
   * @private
   * @static
   */
  var _watchesForm = null;

  /**
   * Outgoing Get Requests
   *
   * @type {int}
   *
   * @private
   * @static
   */
  var _outGets = 0;

  /**
   * Outgoing Put Requests
   *
   * @type {int}
   *
   * @private
   * @static
   */
  var _outPosts = 0;

  /**
   *
   * @type {object}
   *
   * @private
   * @static
   */
  var _collected = {};

  /**
   * Message Page Manager
   *
   * @param app {octFAH.app.Application|Application}
   *
   * @augments octFAH.controller.Controller
   * @constructor
   */
  function MessageController(app)
  {
    _app       = app;
    _charLimit = 222;
    _selected  = [];

    octFAH.controller.Controller.call(this, app);
  }

  MessageController.prototype = Object.create(octFAH.controller.Controller.prototype);

  /**
   * Initialize Message Page Controller Elements
   *
   * @override
   */
  MessageController.prototype.init = function ()
  {
    _watchesForm = document.getElementById("messages-watches");
    _watchesForm.addEventListener(
      "click", function ()
      {
        fetchSelected();
        _shoutForm.setSelCount(_selected.length);
      }
    );
    _shoutForm   = new octFAH.component.WatchShoutForm(_app);
    _shoutForm.getSendButton().addEventListener("click", submitShouts);

  };

  /**
   * @override
   */
  MessageController.prototype.run = function ()
  {
    modUI();
  };

  /**
   * Rebuild Selected User Array
   */
  function fetchSelected()
  {
    var i, butt, ht;

    ht   = [];
    butt = _watchesForm.querySelectorAll("table input:checked");

    for (i = 0; i < butt.length; i++) {
      ht.push(_app.build(butt[i]).parent("table").element().querySelector("a").getAttribute("href"));
    }

    _selected = ht;
  }

  /**
   * Fetch Data
   *
   * Makes a GET request to the provided user's page in an attempt to gather
   * the needed data to auto submit a shout.
   *
   * @param url {string}
   *
   * @returns {{key: string, action: string, name: string}|*}
   */
  function fetchData(url)
  {
    var req, data;

    data = {key: "", action: "shout", name: ""};

    req              = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "document";
    req.addEventListener("load", parseForKey(req, data));
    req.addEventListener("abort", subOutGets);
    req.addEventListener("error", subOutGets);
    _outGets++;
    req.send();

    return data;
  }

  function subOutGets()
  {
    _outGets--;
    send();
  }

  function subOutPosts()
  {
    _outPosts--;
    removeSelected();
  }

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
  function parseForKey(req, data)
  {
    return function ()
    {
      var el;
      try {
        el          = req.responseXML.getElementById("JSForm");
        data.key    = el.querySelector("input[name=key]").getAttribute("value");
        data.name   = el.querySelector("input[name=name]").getAttribute("value");
        data.action = "shout";
      } catch (e) {

      } finally {
        subOutGets();
      }
    };
  }

  function send()
  {
    var i, text, temp;

    if (_outGets !== 0) {
      return;
    }

    text = _shoutForm.getShoutTextElement().value;

    for (i in _collected) {
      if (!_collected.hasOwnProperty(i)) {
        continue;
      }
      temp = _collected[i];

      if (!temp.name || !temp.action || !temp.key) {
        continue;
      }

      submitShout(temp.key, temp.name, temp.action, text);
    }
  }

  /**
   * Submit A Shout
   *
   * @param key    {String}
   * @param name   {String}
   * @param action {String}
   * @param shout  {String}
   * @param [func] {Function}
   */
  function submitShout(key, name, action, shout, func)
  {
    var post;

    post = new octFAH.http.PostRequest();
    post.setUrl(octFAH.app.Config.userPage + name);
    post.setHeader("Content-type", "application/x-www-form-urlencoded")
      .setData(
      "action=" + action + "&key=" + key + "&name=" + name + "&shout=" + shout + "&chars_left=" + (_charLimit - shout.length).toString()
    );

    if (func) {
      post.onAny(func);
    }

    post.onAny(subOutPosts);
    post.send();
    _outPosts++;
  }

  function modUI()
  {
    var watches, watchControls, swButt, u;

    u             = _app.getHTMLUtil();
    watches       = document.getElementById("messages-watches");
    watchControls = watches.querySelector("li.section-controls");

    swButt = u.makeButton("Mass Shout Selected", showShoutWatchDiv);
    swButt.setAttribute("class", "button octModalShow");
    watchControls.insertBefore(swButt, watchControls.querySelector("input.remove"));

  }

  /**
   * Show the Shout to Watchers div
   */
  function showShoutWatchDiv()
  {
    _shoutForm.show();
  }

  /**
   *
   */
  function submitShouts()
  {
    var i, l, d;

    l = _selected.length;

    for (i = 0; i < l; i++) {
      try {
        d                  = fetchData(_selected[i]);
        _collected[d.name] = d;
      } catch (err) {
      }
    }

    _shoutForm.hide();
  }

  /**
   *
   */
  function removeSelected()
  {
    if (_outPosts > 0) {
      return;
    }
    _watchesForm.querySelector("input.remove").click();
  }

  return MessageController;
})();