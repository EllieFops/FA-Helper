/**
 * Settings Menu Component
 *
 * @namespace octFAH.component.SettingsMenu
 * @augments  octFAH.component.ModalComponent
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.2
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.component.SettingsMenu = function (app) {

  /**
   * Hover Preview Checkbox
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._hoverPreviewCheckbox = app
    .wrap(app.getHTMLUtil().makeCheckBox("", "", app.getSettings().showPreviews))
    .change(this._previewToggle());


  /**
   * Preview Size Select Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._previewSizeSelect = app
    .wrap("<select>")
    .attribute("id", "octPrevSizeSel")
    .change(this._previewSizeChange());


  /**
   * Watcher Shout Default Text Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._watcherShoutTextarea = app
    .wrap("<textarea>")
    .style({width: "300px", height: "5em"})
    .input(this._handleWatchShoutTextChange());


  /**
   * Favorite Shout Default Text Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._favoriteShoutTextarea = app
    .wrap("<textarea>")
    .style({width: "300px", height: "5em"});


  /**
   * Base Form Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._baseForm = app
    .wrap("<form>")
    .style({margin: "10px"});

  octFAH.component.ModalComponent.call(this, app, document.createElement("div"));

  this._init();
};

octFAH.component.SettingsMenu.prototype = Object.create(octFAH.component.ModalComponent.prototype);

/**
 * @override
 * @private
 */
octFAH.component.SettingsMenu.prototype._init = function () {
  this._initDiv();
  this._initForm();
  this._modUI();
};

/**
 *
 * @returns {Element}
 * @public
 */
octFAH.component.SettingsMenu.prototype.getHoverPreviewCheckbox = function () {
  return this._hoverPreviewCheckbox.getElement();
};

/**
 *
 * @returns {Element}
 * @public
 */
octFAH.component.SettingsMenu.prototype.getPreviewSizeSelect = function () {
  return this._previewSizeSelect.getElement();
};

/**
 *
 * @returns {Element}
 * @public
 */
octFAH.component.SettingsMenu.prototype.getWatcherShoutTextarea = function () {
  return this._watcherShoutTextarea.getElement();
};

/**
 *
 * @returns {Element}
 * @public
 */
octFAH.component.SettingsMenu.prototype.getBaseForm = function () {
  return this._baseForm.getElement();
};

/**
 * Make Needed Alterations to the Default UI
 *
 * @private
 */
octFAH.component.SettingsMenu.prototype._modUI = function () {
  var el, but, li;

  but = this._app.wrap("<a>")
    .click(this._handleShow())
    .style({cursor: "pointer", color: "#cfcfcf"})
    .getElement();

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
};

/**
 * Initialize Container Div
 *
 * @private
 */
octFAH.component.SettingsMenu.prototype._initDiv = function () {
  var title;

  title = this._app.wrap("<span>")
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

  this._app.wrap(this._htmlElement).addClass("octModal").append(title);
};

/**
 *
 * @private
 */
octFAH.component.SettingsMenu.prototype._initForm = function () {
  var u, i, labels, opt, v, s;

  s = this._app.getSettings();
  u = this._app.getHTMLUtil();
  v = this._app.getHelperUtil();

  this._baseForm.append(
    [
      u.makeWrapperLabel("Enable Previews", this._hoverPreviewCheckbox.getElement()),
      u.makeWrapperLabel("Preview Size", this._previewSizeSelect.getElement()),
      u.makeWrapperLabel("Watcher Auto Shout Text", this._watcherShoutTextarea.getElement()),
      u.makeWrapperLabel("Favorite Auto Shout Text", this._favoriteShoutTextarea.getElement())
    ]
  );

  // Previously saved watcher shout value
  if (s.watchShoutText.length > 0) {
    this._watcherShoutTextarea.value(s.watchShoutText);
  } else {
    this._watcherShoutTextarea.value("");
  }

  // Previously saved new fav shout value
  if (s.favShoutText.length > 0) {
    this._favoriteShoutTextarea.value(s.favShoutText);
  } else {
    this._favoriteShoutTextarea.value("");
  }

  // Select Options
  for (i = 200; i <= 400; i += 100) {
    opt = u.makeSelectOption(i, v.toPx(i));
    if (i === s.previewSize || i.toString() === s.previewSize.toString()) {
      opt.setAttribute("selected", "selected");
    }
    this._previewSizeSelect.append(opt);
  }

  // Style Labels
  labels = this._baseForm.getElement().querySelectorAll("label > span");
  for (i = 0; i < labels.length; i++) {
    labels[i].parentNode.style.display      = "block";
    labels[i].parentNode.style.marginBottom = "5px";
    u.style(labels[i], {display: "block", padding: "5px", fontSize: "1.1em", width: "200px"});
  }

  this._htmlElement.appendChild(this._baseForm.getElement());
};

/**
 * Handle Show Settings
 *
 * @returns {Function}
 * @private
 */
octFAH.component.SettingsMenu.prototype._handleShow = function () {
  var self = this;
  return function () {self.show();};
};

/**
 * Preview Size Change
 *
 * @returns {Function}
 * @private
 */
octFAH.component.SettingsMenu.prototype._previewSizeChange = function () {
  var self = this;
  return function (e) {
    self._app.getSettings.previewSize = e.target.value;
    self._app.pushSettings();
  };
};

/**
 * Preview Toggle
 *
 * @returns {Function}
 * @private
 */
octFAH.component.SettingsMenu.prototype._previewToggle = function () {
  var self = this;
  return function (e) {
    self._app.getSettings().showPreviews = e.target.checked;
    self._app.pushSettings();
  };
};

/**
 * Handle Mass Watch Shout Default Text Update
 *
 * @returns {Function}
 * @private
 */
octFAH.component.SettingsMenu.prototype._handleWatchShoutTextChange = function () {
  var self = this;
  return function () {
    self._app.getSettings.watchShoutText = self._watcherShoutTextarea.getElement().value || "";
    self._app.pushSettings();
  };
};
