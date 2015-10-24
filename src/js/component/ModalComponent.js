/**
 * Modal UI Component
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @augments Component
 * @namespace octFAH.component
 */
octFAH.component.ModalComponent = (function () {

  "use strict";

  var _app;
  var _curtain;

  /**
   * UI Component
   *
   * @param app     {Application}
   * @param element {HTMLElement}
   *
   * @augments Component
   * @constructor
   */
  function ModalComponent(app, element) {
    _app          = app;
    this._element = element;
    octFAH.component.Component.call(this, app, element);

    init(this);
  }

  ModalComponent.prototype = Object.create(octFAH.component.Component.prototype);

  ModalComponent.prototype.show = function () {
    octFAH.component.Component.prototype.show.call(this);
    _curtain.style.display = "block";
  };

  function init(self) {
    if (typeof _curtain === "undefined") {
      initCurtain();
    }
    initElement(self);
  }

  /**
   * Initialize Background Curtain
   */
  function initCurtain() {
    _curtain = _app
      .wrap("div")
      .style(
      {
        position:   "fixed",
        top:        "0px",
        bottom:     "0px",
        left:       "0px",
        right:      "0px",
        width:      "100%",
        height:     "100%",
        zIndex:     "9999",
        background: "#333",
        opacity:    "0.8",
        display:    "none"
      }
    )
      .attribute("class", "octModal")
      .click(
      function () {
        var i, a;
        a = document.querySelectorAll(".octModal");
        for (i = 0; i < a.length; i++) {
          a[i].style.display = "none";
        }
      }
    )
      .element();

    document.querySelector("body").appendChild(_curtain);
  }

  /**
   * Initialize Modal Element
   *
   * @param self {octFAH.component.ModalComponent|ModalComponent}
   */
  function initElement(self) {
    var e = self._element;

    _app
      .wrap(e)
      .style(
      {
        position:     "fixed",
        display:      "none",
        zIndex:       "10000",
        border:       "15px solid #666",
        borderRadius: "20px",
        width:        "500px",
        height:       "300px",
        marginTop:    "-155px",
        marginLeft:   "-255px",
        top:          "50%",
        left:         "50%"
      }
    );

    document.querySelector("body").appendChild(e);
  }

  return ModalComponent;
})();