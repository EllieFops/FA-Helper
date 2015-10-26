/**
 * Modal UI Component
 *
 * @namespace octFAH.component.ModalComponent
 * @augments  octFAH.component.Component
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.3
 *
 * @param app     {octFAH.app.Application}
 * @param element {HTMLElement}
 *
 * @constructor
 */
octFAH.component.ModalComponent = function (app, element) {
  octFAH.component.Component.call(this, app, element);

  /**
   * Modal Curtain
   *
   * @type {Element}
   * @private
   */
  this._curtain = null;

  this._init();
};

octFAH.component.ModalComponent.prototype = Object.create(
  octFAH.component.Component.prototype,
  {
    _init: function () {
      this._initCurtain();
      this._initElement();
    },

    show: function () {
      octFAH.component.Component.prototype.show.call(this);
      this._curtain.style.display = "block";
    },

    /**
     * Initialize Background Curtain
     *
     * @private
     */
    _initCurtain: function () {
      this._curtain = this._app
        .build("div")
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
      document.querySelector("body").appendChild(this._curtain);
    },

    /**
     * Initialize Modal Element
     *
     * @private
     */
    _initElement: function () {
      var e = this._htmlElement;

      this._app.build(e).style(
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
  }
);