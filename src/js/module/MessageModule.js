/**
 * Message Page Module
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.module
 */
octFAH.module.MessageModule = (function ()
{
  /**
   * @type {octFAH.core.Application|Application}
   */
  var _app;

  /**
   * @type {int}
   */
  var _charLimit;

  /**
   * @type {string[]}
   */
  var _selected;

  /**
   * @type {octFAH.component.WatchShoutForm|WatchShoutForm}
   */
  var _shoutForm;
  var _form;

  /**
   * Message Page Manager
   *
   * @param app {octFAH.core.Application|Application}
   *
   * @constructor
   */
  function MessageModule(app)
  {
    _app       = app;
    _charLimit = 222;
    _selected  = [];

    init();
  }

  /**
   * Initialize Message Page Module Elements
   */
  function init()
  {
    _form = document.getElementById("messages-watches");
    _form.addEventListener('click', function () {fetchSelected(); _shoutForm.setSelCount(_selected.length);});
    _shoutForm = new octFAH.component.WatchShoutForm(_app);


    modUI();
  }

  /**
   * Rebuild Selected User Array
   */
  function fetchSelected()
  {
    var i, butt, ht;

    ht = [];
    butt = _form.querySelectorAll("table input:checked");

    for (i = 0; i < butt.length; i++) {
      ht.push(_app.wrap(butt[i]).parent("table").getElement().querySelector("a").getAttribute("href"));
    }

    _selected = ht;
  }

  /**
   * Fetch Data
   *
   * Makes a GET request to the provided user's page in an attempt to gather
   * the needed data to auto submit a shout.
   *
   * @param user {string}
   *
   * @returns {{key: string, action: string, name: string}|*}
   */
  //function fetchData(user)
  //{
  //  var req, con, data;
  //
  //  con  = octFAH.core.Config;
  //  data = {key: "", action: "shout", name: ""};
  //
  //  req = new XMLHttpRequest();
  //  req.open("GET", con.userPage + user);
  //  req.addEventListener("load", parseForKey(req, data));
  //
  //  return data;
  //}

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
  //function parseForKey(req, data)
  //{
  //  return function ()
  //  {
  //    var el;
  //    try {
  //      el        = req.responseXML.getElementById("form");
  //      data.key  = el.querySelector("input[name=key]").getAttribute("value");
  //      data.name = el.querySelector("input[name=name]").getAttribute("value");
  //    } catch (e) {
  //
  //    }
  //  };
  //}

  /**
   * Submit A Shout
   *
   * @param key    {String}
   * @param name   {String}
   * @param action {String}
   * @param shout  {String}
   * @param func   [Function]
   */
  //function submitShout(key, name, action, shout, func)
  //{
  //  var post;
  //
  //  post = new octFAH.http.PostRequest();
  //  post.setHeader("Content-type", "application/x-www-form-urlencoded")
  //    .setData(
  //    "action=" + action + "&key=" + key + "&name=" + name + "&shout=" + shout + "&chars_left=" + (_charLimit - shout.length).toString()
  //  );
  //
  //  if (func) {
  //    post.onAny(func);
  //  }
  //
  //  post.send();
  //}

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

  return MessageModule;
})();