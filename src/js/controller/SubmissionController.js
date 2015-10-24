/**
 * New Submissions Page Controller
 *
 * @version 1.1
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @augments octFAH.controller.Controller
 * @namespace octFAH.controller
 */
octFAH.controller.SubmissionController = (function ()
{
  "use strict";

  /**
   * @type {octFAH.app.Application|Application}
   */
  var _app;

  /**
   * Notification Removal Form
   *
   * @type {Element}
   */
  var _form;

  /**
   * OnHover Image Preview
   *
   * @type {octFAH.component.HoverView}
   */
  var _hoverView;

  /**
   * Fur Affinity Submissions Page Manager
   *
   * @param app {octFAH.app.Application|Application}
   *
   * @augments octFAH.controller.Controller
   * @constructor
   */
  function SubmissionController(app)
  {
    _app = app;

    octFAH.controller.Controller.call(this, app);
  }

  SubmissionController.prototype = Object.create(octFAH.controller.Controller.prototype);

  /**
   * Initialize Controller
   *
   * @override
   */
  SubmissionController.prototype.init = function ()
  {
    _form      = document.getElementById("messages-form");
    _hoverView = new octFAH.component.HoverView(_app);
    modSubmissionUI();
  };

  /**
   * Modify the Submissions User Interface
   */
  function modSubmissionUI()
  {
    var forms;
    forms = document.querySelectorAll(".actions");
    for (var i = 0; i < forms.length; i++) {
      forms[i].appendChild(makeTabsButton());
    }
  }

  /**
   * Make "Load In Tabs" Button
   *
   * @returns {Element}
   */
  function makeTabsButton()
  {
    return _app
      .build(_app.getHTMLUtil().makeButton("Load In Tabs", handleTabsButton))
      .attribute("class", "octoTabsButton button")
      .element();
  }

  /**
   * Handle "Load In Tabs" Button Click
   */
  function handleTabsButton()
  {
    var boxes = _form.querySelectorAll("input[type=checkbox]:checked");
    var id, i;

    for (i = 0; i < boxes.length; i++) {
      id = parseInt(boxes[i].getAttribute("value"));
      if (id > 0) {
        _app.getBrowserUtil().makeNewTab(octFAH.app.Config.viewPage + id, true);
      }
    }
  }

  return SubmissionController;
})();
