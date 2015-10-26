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
  octFAH.component.ModalComponent.call(this, app, document.createElement("div"));

  /**
   * Hover Preview Checkbox
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._hoverPreviewCheckbox = this._app
    .build(app.htmlUtil.makeCheckBox("", "", app.settings.showPreviews))
    .change(this._previewToggle());


  /**
   * Preview Size Select Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._previewSizeSelect = app
    .build("select")
    .attribute("id", "octPrevSizeSel")
    .change(this._previewSizeChange());


  /**
   * Watcher Shout Default Text Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._watcherShoutTextarea = app
    .build("textarea")
    .style({width: "300px", height: "5em"})
    .input(this._handleWatchShoutTextChange());


  /**
   * Favorite Shout Default Text Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._favoriteShoutTextarea = app
    .build("textarea")
    .style({width: "300px", height: "5em"});


  /**
   * Base Form Element
   *
   * @type {octFAH.util.HTML}
   * @private
   */
  this._baseForm = app
    .build("form")
    .style({margin: "10px"});

  this._init();
};

octFAH.component.SettingsMenu.prototype = Object.create(
  octFAH.component.ModalComponent.prototype,
  {
    _init: function () {
      this._initDiv();
      this._initForm();
      this._modUI();
    },

    get hoverPreviewCheckbox() {return this._hoverPreviewCheckbox.element;},
    get previewSizeSelect()    {return this._previewSizeSelect.element;},
    get watcherShoutTextarea() {return this._watcherShoutTextarea.element;},
    get baseForm()             {return this._baseForm.element;},

    /**
     * Make Needed Alterations to the Default UI
     */
    _modUI: function () {
      var el, but, li;

      but = this._app.build("a")
        .click(this._handleShow())
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
    },

    /**
     * Initialize Container Div
     *
     * @private
     */
    _initDiv: function () {
      var title;

      title = this._app.build("span")
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

      this._app.build(this._htmlElement).addClass("octModal").append(title);
    },

    _initForm: function () {
      var u, i, labels, opt, v, s;

      s = this._app.settings;
      u = this._app.htmlUtil;
      v    = this._app.helperUtil;

      this._baseForm.append(
        [
          u.makeWrapperLabel("Enable Previews",          this._hoverPreviewCheckbox.element),
          u.makeWrapperLabel("Preview Size",             this._previewSizeSelect.element),
          u.makeWrapperLabel("Watcher Auto Shout Text",  this._watcherShoutTextarea.element),
          u.makeWrapperLabel("Favorite Auto Shout Text", this._favoriteShoutTextarea.element)
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
      labels = this._baseForm.element.querySelectorAll("label > span");
      for (i = 0; i < labels.length; i++) {
        labels[i].parentNode.style.display = "block";
        labels[i].parentNode.style.marginBottom = "5px";
        u.style(labels[i], {display: "block", padding: "5px", fontSize: "1.1em", width: "200px"});
      }

      this._htmlElement.appendChild(this._baseForm.element);
    },

    /**
     * Handle Show Settings
     *
     * @private
     *
     * @returns {Function}
     */
    _handleShow: function () {
      var self = this;
      return function () {self.show();};
    },

    /**
     * Preview Size Change
     *
     * @private
     *
     * @returns {Function}
     */
    _previewSizeChange: function () {
      var self = this;
      return function (e) {
        self._app.settings.previewSize = e.target.value;
        self._app.pushSettings();
      };
    },

    /**
     * Preview Toggle
     *
     * @private
     *
     * @returns {Function}
     */
    _previewToggle: function () {
      var self = this;
      return function (e) {
        self._app.settings().showPreviews = e.target.checked;
        self._app.pushSettings();
      };
    },

    /**
     * Handle Mass Watch Shout Default Text Update
     *
     * @private
     *
     * @returns {Function}
     */
    _handleWatchShoutTextChange: function () {
      var self = this;
      return function () {
        self._app.settings.watchShoutText = self._watcherShoutTextarea.element().value || "";
        self._app.pushSettings();
      };
    }
  }
);