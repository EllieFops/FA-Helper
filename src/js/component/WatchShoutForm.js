/**
 * Watch Shout Component
 *
 * Modal form for submitting mass shouts to watchers.
 *
 * @version 1.0
 * @since   0.4
 *
 * @author Elizabeth Harper
 *
 * @augments  ModalComponent
 * @namespace octFAH.component
 */
octFAH.component.WatchShoutForm = (function ()
{

  "use strict";

  /**
   * Application
   *
   * @type {octFAH.app.Application|Application}
   *
   * @private
   * @static
   */
  var _app;

  /**
   * Image Hover Preview
   *
   * @param application {octFAH.app.Application|Application}
   *
   * @augments  ModalComponent
   *
   * @constructor
   */
  function WatchShoutForm(application)
  {
    _app = application;

    /**
     * Outer Container Div
     *
     * @type {Element}
     * @private
     */
    this._div = document.createElement("div");

    /**
     * Selected Watcher Count Input
     *
     * @type {Element}
     * @private
     */
    this._num = null;

    /**
     * Checkbox Input
     *
     * "Use Default Watch Shout" checkbox
     *
     * @type {Element}
     * @private
     */
    this._check = null;

    /**
     * Shout Text Input
     *
     * @type {Element}
     * @private
     */
    this._text = null;

    /**
     * Send Shouts Button
     *
     * @type {Element}
     * @private
     */
    this._sendButton = null;

    this.shoutText = "";

    octFAH.component.ModalComponent.call(this, _app, this._div);
    this._setupForm();
  }

  WatchShoutForm.prototype = Object.create(octFAH.component.ModalComponent.prototype);

  /**
   * Update Select Count
   *
   * @param num {int}
   */
  WatchShoutForm.prototype.setSelCount = function (num)
  {
    this._num.value = num;
  };

  /**
   * Get Use Default Text Checkbox
   *
   * @returns {Element}
   */
  WatchShoutForm.prototype.getUseDefaultElement = function ()
  {
    return this._check;
  };

  /**
   * Get Shout Text Textarea
   *
   * @returns {Element}
   */
  WatchShoutForm.prototype.getShoutTextElement = function ()
  {
    return this._text;
  };

  WatchShoutForm.prototype.getSendButton = function ()
  {
    return this._sendButton;
  };

  /**
   * Construct the Shout to new Watchers form.
   *
   * @private
   */
  WatchShoutForm.prototype._setupForm = function ()
  {

    var sett, util, cLab, tLab, nLab, self;

    self = this;
    util = _app.getHTMLUtil();
    sett = _app.getSettings();

    this.shoutText = "";

    this._num = _app.build("input")
      .attributes({disabled: "disabled", type: "number", "default": "0"})
      .style({width: "25px"})
      .element();

    this._text = _app.build("textarea")
      .style({width: "200px", height: "8em"})
      .element();

    this._check = util.makeCheckBox("", "", (sett.watchShoutText.length >= 4));

    this._text.value = sett.watchShoutText || "";
    if (this._text.value.length >= 4) {
      this._text.setAttribute("disabled", "disabled");
    }

    this._sendButton = util.makeButton("Send");

    nLab = util.makeWrapperLabel("Selected Watchers", this._num);
    cLab = util.makeWrapperLabel("Use default watcher shout", this._check, false);
    tLab = util.makeWrapperLabel("Shout Text", this._text);

    util.style([tLab.firstElementChild, cLab, tLab, nLab.firstElementChild], {display: "block"});
    util.style([tLab, cLab, nLab], {marginBottom: "5px", fontSize: "1.1em"});

    this._check.addEventListener(
      "change",
      function ()
      {
        if (self._check.checked) {
          self._text.setAttribute("disabled", "disabled");
          self.shoutText   = self._text.value || "";
          self._text.value = sett.watchShoutText;
        } else {
          self._text.removeAttribute("disabled");
          if (self.shoutText.length) {
            self._text.value = self.shoutText;
          }
        }
      }
    );

    _app.build(this._div).attribute("id", "octWatchShoutDiv").addClass("octModal").append(
      _app.build("form").style({margin: "25px"}).append(
        [
          _app.build("p").style({fontSize: "1.1em"}).html("Warning: do not use this on slow connections!").element(),
          nLab,
          cLab,
          tLab,
          _app.build("div").style({textAlign: "right"}).append([this._sendButton]).element()
        ]
      )
        .element()
    );
  };

  return WatchShoutForm;
}());