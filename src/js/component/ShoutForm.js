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
  octFAH.component.ModalComponent.call(this, app, document.createElement("div"));

  /**
   * Selected User Count Input
   *
   * @type {octFAH.util.HTML}
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
   * @type {octFAH.util.HTML}
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
};

octFAH.component.ShoutForm.prototype = Object.create(octFAH.component.ModalComponent.prototype);

/**
 * Update Select Count
 *
 * @param num {int}
 * @public
 */
octFAH.component.ShoutForm.prototype.setSelCount = function (num) {this._num.value(num);};

/**
 * Get Use Default Text Checkbox
 *
 * @returns {Element}
 * @public
 */
octFAH.component.ShoutForm.prototype.getUseDefaultElement = function () {return this._check;};

/**
 * Get Shout Text Textarea
 *
 * @returns {Element}
 * @public
 */
octFAH.component.ShoutForm.prototype.getShoutTextElement = function () {return this._text.getElement();};

/**
 * Get Shout Send Button
 *
 * @returns {Element}
 * @public
 */
octFAH.component.ShoutForm.prototype.getSendButton = function () {return this._sendButton;};

/**
 * @inheritDoc octFAH.component.ModalComponent.prototype._init
 */
octFAH.component.ShoutForm.prototype._init = function () {
  octFAH.component.ModalComponent.prototype._init.call(this);

  this._num        = this._app.wrap("<input>").attributes({disabled: "true", type: "number", "default": "0"})
    .style({width: "25px"});
  this._check      = this._app.getHTMLUtil().makeCheckBox("", "", false);
  this._text       = this._app.wrap("<textarea>").style({width: "200px", height: "8em"});
  this._sendButton = this._app.getHTMLUtil().makeButton("Send");
};
