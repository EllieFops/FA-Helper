/**
 * Status/Progress Component
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.component
 */
octFAH.component.StatusBox = (function () {

  "use strict";

  var _app;

  /**
   * Status Box Manager
   *
   * @param app {Application}
   *
   * @constructor
   */
  function StatusBox(app) {
    _app      = app;
    var outer = document.createElement("div");

    octFAH.component.Component.call(this, app, outer);

    this._completion = 0;
    this._progress   = null;

    init(this, outer);
  }

  StatusBox.prototype = Object.create(octFAH.component.Component.prototype);

  /**
   * Set Completion Percent
   *
   * @param percent {int}
   */
  StatusBox.prototype.setCompletion = function (percent) {
    this._completion = percent;
    updateProgress(this);
  };

  /**
   * Get Completion Percent
   *
   * @returns {number|int}
   */
  StatusBox.prototype.getCompletion = function () {
    return this._completion;
  };

  /**
   * Initialize
   *
   * @param self  {octFAH.component.StatusBox|StatusBox}
   * @param outer {HTMLElement}
   */
  function init(self, outer) {
    var s;

    makeOuterDiv(outer);
    self._progress = makeProgressBar();

    s = makeProgressContainer();

    s.appendChild(self._progress);
    outer.appendChild(s);
  }

  /**
   * Make Outer Div
   */
  function makeOuterDiv(div) {
    _app.getHTMLUtil().style(
      div,
      {
        padding:      "25px",
        position:     "fixed",
        border:       "4px solid pink",
        borderRadius: "10px",
        bottom:       "50px",
        right:        "50px",
        display:      "none"
      }
    );

  }

  /**
   * Make Progress Bar Container Div
   *
   * @returns {HTMLElement}
   */
  function makeProgressContainer() {
    var div;

    div = document.createElement("div");
    _app.getHTMLUtil().style(
      div,
      {
        height:       "24px",
        width:        "200px",
        borderRadius: "5px",
        border:       "1px solid #444",
        overflow:     "hidden"
      }
    );

    return div;
  }

  /**
   * Make Progress Bar
   *
   * @return {HTMLElement}
   */
  function makeProgressBar() {
    var div;

    div = document.createElement("div");
    _app.getHTMLUtil().style(
      div,
      {
        height:          "100%",
        backgroundColor: "#3379aa"
      }
    );

    return div;
  }

  /**
   * Update Progress
   *
   * @param con {octFAH.component.StatusBox|StatusBox}
   */
  function updateProgress(con) {
    con._progress.style.width = con.toString() + "%";
  }

  return StatusBox;
})();