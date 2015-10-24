/**
 * New Submissions Page Module
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.module
 */
octFAH.module.SubmissionModule = (function () {
  "use strict";

  /**
   * @type {octFAH.core.Application|Application}
   */
  var _app;

  var _form;
  var _self;
  var _hoverView;

  /**
   * Fur Affinity Submissions Page Manager
   *
   * @param app {octFAH.core.Application|Application}
   *
   * @constructor
   */
  function SubmissionModule(app) {
    _app  = app;
    _form = document.getElementById("messages-form");
    _self = this;

    init();
  }

  /**
   * Initialize
   */
  function init() {
    _hoverView = new octFAH.component.HoverView(_app);
    modSubmissionUI();
  }

  /**
   * Modify the Submissions User Interface
   */
  function modSubmissionUI() {
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
  function makeTabsButton() {
    return _app
      .wrap(_app.getHTMLUtil().makeButton("Load In Tabs", handleTabsButton))
      .attribute("class", "octoTabsButton button")
      .element();
  }

  /**
   * Handle "Load In Tabs" Button Click
   */
  function handleTabsButton() {
    var boxes = _form.querySelectorAll("input[type=checkbox]:checked");
    var id, i;

    for (i = 0; i < boxes.length; i++) {
      id = parseInt(boxes[i].getAttribute("value"));
      if (id > 0) {
        _app.openArtTab(_app.makeArtLink(id));
      }
    }
  }

  return SubmissionModule;
})();
