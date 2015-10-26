/**
 * Generic Shout Component
 *
 * Modal form for submitting mass shouts to watchers.
 *
 * @namespace octFAH.component.ShoutForm
 * @augments  octFAH.component.ModalComponent
 *
 * @author Elizabeth Harper (elliefops@gmail.com)
 * @version 1.0
 * @since   0.5
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.component.ShoutForm = function (app) {
  /**
   * Outer Container Div
   *
   * @type {Element}
   * @protected
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

  octFAH.component.ModalComponent.call(this, app, this._div);

  this._setupForm();
};

octFAH.component.ShoutForm.prototype = Object.create(
  octFAH.component.ModalComponent.prototype,
  {
    /**
     * Update Select Count
     *
     * @param num {int}
     */
    setSelCount: function (num) {this._num.value = num;},

    /**
     * Get Use Default Text Checkbox
     *
     * @returns {Element}
     */
    getUseDefaultElement: function () {return this._check;},

    /**
     * Get Shout Text Textarea
     *
     * @returns {Element}
     */
    getShoutTextElement: function () {return this._text;},

    /**
     * Get Shout Send Button
     *
     * @returns {Element}
     */
    getSendButton: function () {return this._sendButton;},

    _setupForm: function () {
      var util, a;

      a = this._app;

      util = a.getHTMLUtil();

      this.shoutText = "";

      this._num = a.build("input")
        .attributes({disabled: "disabled", type: "number", "default": "0"})
        .style({width: "25px"})
        .element();

      this._text = a.build("textarea")
        .style({width: "200px", height: "8em"})
        .element();

      this._check = util.makeCheckBox("", "", false);

      this._sendButton = util.makeButton("Send");
    }
  }
);