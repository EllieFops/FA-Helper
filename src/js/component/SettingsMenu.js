/**
 * Settings Menu Component
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @augments  ModalComponent
 * @namespace octFAH.component
 */
octFAH.component.SettingsMenu = (function ()
{

  "use strict";

  var _app;
  var _self;

  /**
   * Settings Menu
   *
   * @param app {Application}
   *
   * @augments ModalComponent
   * @constructor
   */
  function SettingsMenu(app)
  {
    _self = this;
    _app  = app;

    var div = document.createElement("div");

    octFAH.component.ModalComponent.call(this, app, div);

    init(this, div);
  }

  SettingsMenu.prototype = Object.create(octFAH.component.ModalComponent.prototype);

  function init(self, div)
  {
    initDiv(div);
    initForm(div);
    modUI(self);
  }

  /**
   * Handle Show Settings
   *
   * @param self {octFAH.component.ModalComponent|ModalComponent}
   *
   * @returns {Function}
   */
  function handleShow(self)
  {
    return function ()
    {
      self.show();
    };
  }

  /**
   * Preview Size Change
   *
   * @param e {Event}
   */
  function previewSizeChange(e)
  {
    _app.getSettings().previewSize = e.target.value;
    _app.pushSettings();
  }

  /**
   * Preview Toggle
   *
   * @param e {Event}
   */
  function previewToggle(e)
  {
    _app.getSettings().showPreviews = e.target.checked;
    _app.pushSettings();
  }

  /**
   * Make Needed Alterations to the Default UI
   */
  function modUI(self)
  {
    var el, but, li;

    but = _app.build("a")
      .click(handleShow(self))
      .style({cursor: "pointer", color: "#cfcfcf"})
      .element();

    li = document.createElement("li");
    li.appendChild(but);

    el = document.querySelector("table.block-menu-top ul.dropdown-left li:nth-child(2)");

    if (!el) {
      el = document.querySelector("#nav li:nth-child(4)");
    } else {
      but.style.fontWeight = "bold";
    }

    but.innerHTML = "Helper";

    el.parentNode.insertBefore(li, el);
  }

  /**
   * Initialize Container Div
   *
   * @param div {Element}
   */
  function initDiv(div)
  {
    var title;

    title = _app.build("span")
      .html("FA Helper Settings")
      .style(
      {
        fontWeight: "bold",
        fontSize:   "1.2em",
        display:    "block",
        textAlign:  "center",
        padding:    "0 20px 10px 20px"
      }
    );

    _app.build(div).addClass("octModal").append(title);
  }

  function initForm(div)
  {
    var form, util, select, i, labels, opt, check, text, v, sett;

    sett = _app.getSettings();
    util = _app.getHTMLUtil();
    v    = _app.getHelperUtil();

    select = _app
      .build("select")
      .attribute("id", "octPrevSizeSel")
      .change(previewSizeChange)
      .element();

    text = _app
      .build("textarea")
      .style({width: "300px", height: "5em"})
      .input(
      function ()
      {
        sett.watchShoutText = text.value || "";
        _app.pushSettings();
      }
    )
      .element();

    check = _app
      .build(util.makeCheckBox("", "", _app.getSettings().showPreviews))
      .change(previewToggle)
      .element();

    form = _app
      .build("form")
      .style({margin: "10px"})
      .append(
      [
        util.makeWrapperLabel("Enable Previews", check),
        util.makeWrapperLabel("Preview Size", select),
        util.makeWrapperLabel("Watcher Auto Shout Text", text)
      ]
    )
      .element();

    if (sett.watchShoutText.length > 0) {
      text.value = sett.watchShoutText;
    } else {
      text.value = "";
    }

    // Select Options
    for (i = 200; i <= 400; i += 100) {
      opt = util.makeSelectOption(i, v.toPx(i));
      if (i === sett.previewSize || i.toString() === sett.previewSize.toString()) {
        opt.setAttribute("selected", "selected");
      }
      select.appendChild(opt);
    }

    // Style Labels
    labels = form.querySelectorAll("label > span");
    for (i = 0; i < labels.length; i++) {
      labels[i].parentNode.style.display      = "block";
      labels[i].parentNode.style.marginBottom = "5px";

      util.style(labels[i], {display: "block", padding: "5px", fontSize: "1.1em", width: "200px"});
    }

    div.appendChild(form);
  }

  return SettingsMenu;
})();