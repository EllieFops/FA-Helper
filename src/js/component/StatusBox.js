/**
 * Status/Progress Component
 *
 * @namespace octFAH.component.StatusBox
 * @augments  octFAH.component.Component
 *
 * @author Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.4
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.component.StatusBox = function (app) {
  /**
   *
   * @type {number}
   * @private
   */
  this._completion = 0;

  /**
   *
   * @type {Element}
   * @private
   */
  this._progress   = null;

  this._init();

  octFAH.component.Component.call(this, app, document.createElement("div"));
};

octFAH.component.StatusBox.prototype = Object.create(octFAH.component.Component.prototype);

/**
 * Set Completion Percent
 *
 * @param percent {int}
 * @public
 */
octFAH.component.StatusBox.prototype.setCompletion = function (percent) {
  this._completion = percent;
  this._updateProgress();
};


/**
 * Get Completion Percent
 *
 * @returns {number|int}
 * @public
 */
octFAH.component.StatusBox.prototype.getCompletion = function () {return this._completion;};

/**
 * Initialize
 *
 * @private
 */
octFAH.component.StatusBox.prototype._init = function () {

  this._progress = this._app
    .wrap("<div>")
    .style({height: "100%", backgroundColor: "#3379aa"})
    .getElement();

  this._app
    .wrap(this._htmlElement)
    .style(
    {
      padding:      "25px",
      position:     "fixed",
      border:       "4px solid pink",
      borderRadius: "10px",
      bottom:       "50px",
      right:        "50px",
      display:      "none"
    }
  )
    .append(
    this._app
      .wrap("<div>")
      .style({height: "24px", width: "200px", borderRadius: "5px", border: "1px solid #444", overflow: "hidden"})
      .append(this._progress)
      .getElement()
  );
};

/**
 * Update Progress
 *
 * @private
 */
octFAH.component.StatusBox.prototype._updateProgress = function () {
  this._progress.style.width = this.toString() + "%";
};