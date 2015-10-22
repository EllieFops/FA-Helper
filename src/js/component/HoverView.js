/**
 * Hover Preview Component
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.component
 */

octFAH.component.HoverView = (function ()
{
  var _app, _img, _pane, _settings;

  /**
   * Image Hover Preview
   *
   * @param app {octFAH.core.Application|Application}
   *
   * @constructor
   */
  function HoverView(app)
  {
    _pane     = document.createElement("DIV");
    _app      = app;
    _img      = document.createElement("IMG");
    _settings = app.getSettings();

    octFAH.component.Component.call(this, app, _pane);
    init(this);
  }

  HoverView.prototype = Object.create(octFAH.component.Component.prototype);

  /**
   * Handle MouseOver events
   *
   * @param e {Event}
   */
  function handleMouseOver(e)
  {
    if (!_settings.showPreviews) {
      return;
    }
    _pane.style.display = "block";
    _img.setAttribute("src", e.target.getAttribute("src").replace("@200", "@" + _settings.previewSize.toString()));
  }

  /**
   * Handle MouseMove events
   *
   * @param e {Event}
   */
  function handleMouseMove(self)
  {
    return function (e)
    {
      if (!_settings.showPreviews) {
        return;
      }

      var x, y, i;
      i = _img.getBoundingClientRect();

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
  }

  /**
   * Handle MouseOut Event
   */
  function handleMouseOut()
  {
    _pane.style.display = "none";
  }

  /**
   * Initialize HoverView Elements
   */
  function init(self)
  {

    // Init Elements
    _pane.appendChild(_img);
    _app.getHTMLUtil().applyStyle(
      _pane,
      {
        display:  "none",
        position: "absolute",
        zIndex:   10000,
        border:   "2px solid pink"
      }
    );
    document.querySelector("body").appendChild(_pane);

    // Init Handlers
    var i, a;
    a = document.querySelectorAll("b img");
    for (i = 0; i < a.length; i++) {
      a[i].addEventListener("mouseover", handleMouseOver);
      a[i].addEventListener("mouseout", handleMouseOut);
      a[i].addEventListener("mousemove", handleMouseMove(self));
    }
  }

  return HoverView;
})();