/**
 * Modal UI Component
 *
 * @memberof octFAH.component
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
};

octFAH.component.ModalComponent.prototype = Object.create(octFAH.component.Component.prototype);

/**
 * @override
 * @public
 */
octFAH.component.ModalComponent.prototype.show = function () {
  octFAH.component.Component.prototype.show.call(this);
  this._curtain.style.display = "block";
};

/**
 * Initialize Modal Div Contents
 *
 * @protected
 */
octFAH.component.ModalComponent.prototype._init = function(){
  this._curtain = this._app
    .wrap("<div>")
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
    .addClass("octModal")
    .click(
    function () {
      var i, a;
      a = document.querySelectorAll(".octModal");
      for (i = 0; i < a.length; i++) {
        a[i].style.display = "none";
      }
    }
  )
    .appendTo()
    .getElement();

  this._app.wrap(this._htmlElement).style(
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
    }).addClass("octModal");

  this._app.wrap("body").append([this._curtain, this._htmlElement]);
};
