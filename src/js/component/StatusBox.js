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

octFAH.component.StatusBox = (function ()
{

  var _app;

  /**
   * Status Box Manager
   *
   * @param app {Application}
   * @constructor
   */
  function StatusBox(app)
  {
    _app            = app;
    this.completion = 0;
    this.outer      = null;
    this.progress   = null;

    init(this);
  }

  /**
   * Set Completion Percent
   *
   * @param percent {int}
   */
  StatusBox.prototype.setCompletion = function (percent)
  {
    this.completion = percent;
    updateProgress(this);
  };

  /**
   * Get Completion Percent
   *
   * @returns {number|int}
   */
  StatusBox.prototype.getCompletion = function ()
  {
    return this.completion;
  };

  /**
   * Hide This Status Box
   */
  StatusBox.prototype.hide = function ()
  {
    this.outer.style.display = "none";
  };

  /**
   * Show This Status Box
   */
  StatusBox.prototype.show = function ()
  {
    this.outer.style.display = "block";
  };

  /**
   * Initialize
   *
   * @param self {StatusBoxManager}
   */
  function init(self)
  {
    var s;

    self.progress = makeProgressBar();
    self.outer    = makeOuterDiv();
    s             = makeProgressContainer();

    s.appendChild(self.progress);
    self.outer.appendChild(s);
  }

  /**
   * Make Outer Div
   *
   * @returns {HTMLElement}
   */
  function makeOuterDiv()
  {
    var div;

    div = document.createElement("div");
    _app.getUtil().applyStyle(
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

    return div;
  }

  /**
   * Make Progress Bar Container Div
   *
   * @returns {HTMLElement}
   */
  function makeProgressContainer()
  {
    var div;

    div = document.createElement("div");
    _app.getUtil().applyStyle(
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
  function makeProgressBar()
  {
    var div;

    div = document.createElement("div");
    _app.getUtil().applyStyle(
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
   * @param con {StatusBoxManager}
   */
  function updateProgress(con)
  {
    con.progress.style.width = con.toString() + "%";
  }

  return StatusBox;
})();