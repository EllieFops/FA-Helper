/**
 * New Submissions Page Controller
 *
 * @memberof octFAH.controller
 * @augments octFAH.controller.Controller
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.2
 * @since   0.1
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.controller.SubmissionController = function (app) {

  /**
   * Notification Removal Form
   *
   * @type {Element}
   */
  this._form = null;

  /**
   * OnHover Image Preview
   *
   * @type {octFAH.component.HoverView}
   */
  this._hoverView = null;

  octFAH.controller.Controller.call(this, app);
};

octFAH.controller.SubmissionController.prototype = Object.create(octFAH.controller.Controller.prototype);

/**
 * @override
 * @public
 */
octFAH.controller.SubmissionController.prototype.init = function () {
  this._form      = document.getElementById("messages-form");
  this._hoverView = new octFAH.component.HoverView(this._app);

  this._modSubmissionUI();
};

/**
 * Modify the Submissions User Interface
 *
 * @private
 */
octFAH.controller.SubmissionController.prototype._modSubmissionUI = function () {
  var forms;
  forms = document.querySelectorAll(".actions");
  for (var i = 0; i < forms.length; i++) {
    forms[i].appendChild(this._makeTabsButton());
  }
};

/**
 * Make "Load In Tabs" Button
 *
 * @returns {Element}
 * @private
 */
octFAH.controller.SubmissionController.prototype._makeTabsButton = function () {
  return this._app
    .wrap(this._app.getHTMLUtil().makeButton("Load In Tabs", this._handleTabsButton))
    .attribute("class", "octoTabsButton button")
    .getElement();
};

/**
 * Handle "Load In Tabs" Button Click
 *
 * @private
 */
octFAH.controller.SubmissionController.prototype._handleTabsButton = function () {
  var self = this;

  return function () {
    var boxes = self._form.querySelectorAll("input[type=checkbox]:checked");
    var id, i;

    for (i = 0; i < boxes.length; i++) {
      id = parseInt(boxes[i].getAttribute("value"));
      if (id > 0) {
        self._app.getBrowserUtil().makeNewTab(octFAH.app.Config.viewPage + id, true);
      }
    }
  };
};
