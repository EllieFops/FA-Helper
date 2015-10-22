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
  var _app, _charLimit, _shoutWatchDiv;

  /**
   * Message Page Manager
   *
   * @param app {Application}
   *
   * @constructor
   */
  function MessageModule(app)
  {
    _app       = app;
    _charLimit = 222;
    init();
  }

  /**
   * Initialize Message Page Module Elements
   */
  function init()
  {
    modUI();
    makeShoutWatchForm();
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
   * @param key {String}
   * @param name {String}
   * @param action {String}
   * @param shout {String}
   * @param func [Function]
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
   * Construct the Shout to new Watchers form.
   */
  function makeShoutWatchForm()
  {
    var form, div, text, check, send, sett, curText, util, cLab, tLab, bDiv, para;

    util    = _app.getHTMLUtil();
    sett    = _app.getSettings();
    curText = "";

    form  = document.createElement("form");
    div   = document.createElement("div");
    bDiv  = document.createElement("div");
    para  = document.createElement("p");
    text  = document.createElement("textarea");
    check = util.makeCheckBox("", "", (sett.watchShoutText.length > 4));
    cLab  = util.makeWrapperLabel("Use default watcher shout", check, false);
    tLab  = util.makeWrapperLabel("Shout Text", text);

    util.applyStyle([tLab.firstElementChild, cLab, tLab], {display: "block"});
    util.applyStyle([tLab, cLab], {marginBottom: "5px", fontSize: "1.1em"});
    util.applyStyle(text, {width: "200px", height: "8em"});

    send = util.makeButton("Send");

    _shoutWatchDiv = div;
    div.setAttribute("id", "octWatchShoutDiv");

    util
      .applyStyle(
      div,
      {
        display:      "none",
        border:       "2px solid pink",
        borderRadius: "7px",
        padding:      "10px",
        position:     "absolute",
        zIndex:       10000
      }
    )
      .setAttribute("class", "octModalContent");

    check.addEventListener(
      "change", function ()
      {
        if (check.checked) {
          text.setAttribute("disabled", "disabled");
          curText    = text.value || "";
          text.value = sett.watchShoutText;
        } else {
          text.removeAttribute("disabled");
          if (curText.length) {
            text.value = curText;
          }
        }
      }
    );

    para.innerHTML = "Warning: do not use this on slow connections!";
    bDiv.appendChild(send);
    util.appendChildren(form, [para, cLab, tLab, bDiv]);
    div.appendChild(form);
    document.querySelector("body").appendChild(div);
  }

  /**
   * "Use Default" Checkbox change handler
   *
   * @param e {MouseEvent}
   */
  //function checkChangeHandler(e)
  //{
  //  if (e.target.checked) {
  //
  //  }
  //}

  /**
   * Show the Shout to Watchers div
   *
   * @param e {MouseEvent}
   */
  function showShoutWatchDiv(e)
  {
    var u, v;
    u = _app.getHTMLUtil();
    v = _app.getHelperUtil();
    u.applyStyle(
      _shoutWatchDiv,
      {
        display: "block",
        top:     v.toPx(e.clientY + window.scrollY),
        left:    v.toPx(e.clientX + window.scrollX)
      }
    );
  }

  return MessageModule;
})();