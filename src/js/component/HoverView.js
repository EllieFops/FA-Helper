/**
 * Hover Preview Component
 *
 * @memberof octFAH.component
 * @augments  octFAH.component.Component
 *
 * @author Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.1
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.component.HoverView = function (app) {

  /**
   * Image
   *
   * @type {Element}
   * @private
   */
  this._img = document.createElement("img");

  /**
   *
   * @type {{previewSize: int, showPreviews: boolean, watchShoutText: string, favShoutText: string}}
   * @private
   */
  this._settings = app.getSettings();

  octFAH.component.Component.call(this, app, document.createElement("div"));
  this._init();
};

octFAH.component.HoverView.prototype       = Object.create(octFAH.component.Component.prototype);
/**
 * Initialize HoverView Elements
 */
octFAH.component.HoverView.prototype._init = function () {
  // Init Elements
  this._htmlElement.appendChild(this._img);
  this._app.getHTMLUtil().style(
    this._htmlElement,
    {
      display:  "none",
      position: "absolute",
      zIndex:   10000,
      border:   "2px solid pink"
    }
  );

  document.querySelector("body").appendChild(this._htmlElement);
  // Init Handlers
  var i, a;
  a = document.querySelectorAll("b img");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("mouseover", this._handleMouseOver());
    a[i].addEventListener("mouseout", this._handleMouseOut());
    a[i].addEventListener("mousemove", this._handleMouseMove());
  }
};

/**
 * Handle MouseOver events
 *
 * @private
 */
octFAH.component.HoverView.prototype._handleMouseOver = function () {
  var self = this;
  return function (e) {
    if (!self._settings.showPreviews) {return;}
    self._htmlElement.style.display = "block";
    self._img.setAttribute(
      "src",
      e.target.getAttribute("src").replace("@200", "@" + self._settings.previewSize.toString())
    );
  };
};

/**
 * Handle MouseMove events
 *
 * @private
 */
octFAH.component.HoverView.prototype._handleMouseMove = function () {
  var self = this;

  return function (e) {
    if (!self._settings.showPreviews) {
      return;
    }

    var x, y, i;
    i = self._img.getBoundingClientRect();

    x = e.clientX + window.scrollX + 30;
    if (x + i.width > window.innerWidth) {
      x = e.clientX + window.scrollX - i.width - 30;
    }

    y = (e.clientY - i.height / 2) + window.scrollY;

    if (y < window.scrollY) {
      y += window.scrollY - y;
    } else if (y + i.height > window.innerHeight + window.scrollY) {
      y -= y + i.height - (window.innerHeight + window.scrollY);
    }

    self.topLeft(y, x);
  };
};

/**
 * Handle MouseOut Event
 *
 * @private
 */
octFAH.component.HoverView.prototype._handleMouseOut = function () {
  var self = this;
  return function () {self._htmlElement.style.display = "none";};
};