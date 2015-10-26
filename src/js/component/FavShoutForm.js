/**
 * Favorite Shout Component
 *
 * Modal form for submitting mass shouts to watchers.
 *
 * @depend ShoutForm.js
 *
 * @namespace octFAH.component.FavShoutForm
 * @augments  octFAH.component.ShoutForm
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.0
 * @since   0.5
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.component.FavShoutForm = function (app) {octFAH.component.ShoutForm.call(this, app);};

octFAH.component.FavShoutForm.prototype = Object.create(octFAH.component.ShoutForm.prototype);

/**
 * @override
 * @private
 */
octFAH.component.FavShoutForm.prototype._init = function () {

  var sett, util, cLab, tLab, nLab, self, a;

  // Super
  octFAH.component.ShoutForm.prototype._init.call(this);

  a = this._app;

  self = this;
  util = a.getHTMLUtil();
  sett = a.getSettings();

  this._text.value = sett.favShoutText || "";
  if (this._text.value.length >= 4) {
    this._text.setAttribute("disabled", "disabled");
    this._check.setAttribute("checked", "checked");
  }

  nLab = util.makeWrapperLabel("Selected Users", this._num);
  cLab = util.makeWrapperLabel("Use default new favorite shout", this._check, false);
  tLab = util.makeWrapperLabel("Shout Text", this._text);

  util.style([tLab.firstElementChild, cLab, tLab, nLab.firstElementChild], {display: "block"});
  util.style([tLab, cLab, nLab], {marginBottom: "5px", fontSize: "1.1em"});

  this._check.addEventListener(
    "change",
    function () {
      if (self._check.checked) {
        self._text.setAttribute("disabled", "disabled");
        self.shoutText   = self._text.value || "";
        self._text.value = sett.favShoutText;
      } else {
        self._text.removeAttribute("disabled");
        if (self.shoutText.length) {
          self._text.value = self.shoutText;
        }
      }
    }
  );

  a.wrap(this._htmlElement).attribute("id", "octFav-ShoutDiv").addClass("octModal").append(
    a.wrap("<form>").style({margin: "25px"}).append(
      [
        a.wrap("<p>").style({fontSize: "1.1em"}).html("Warning: do not use this on slow connections!").getElement(),
        nLab,
        cLab,
        tLab,
        a.wrap("<div>").style({textAlign: "right"}).append([this._sendButton]).getElement()
      ]
    )
      .getElement()
  );
};
