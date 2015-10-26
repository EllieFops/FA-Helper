/**
 * Watch Shout Component
 *
 * Modal form for submitting mass shouts to watchers.
 *
 * @namespace octFAH.component.WatchShoutForm
 * @augments  octFAH.component.ModalComponent
 *
 * @author Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.4
 *
 * @param app {octFAH.app.Application}
 *
 * @constructor
 */
octFAH.component.WatchShoutForm = function (app) {octFAH.component.ShoutForm.call(this, app);};

octFAH.component.WatchShoutForm.prototype = Object.create(octFAH.component.ShoutForm.prototype);

/**
 * @override
 * @private
 */
octFAH.component.WatchShoutForm.prototype._init = function () {

  var sett, util, cLab, tLab, nLab, self, a;

  // Super
  octFAH.component.ShoutForm.prototype._init.call(this);

  a    = this._app;
  self = this;
  util = a.getHTMLUtil();
  sett = a.getSettings();

  this._text.value(sett.watchShoutText || "");
  if (this._text.value().length >= 4) {
    this._text.attribute("disabled", "true");
    this._check.setAttribute("checked", "true");
  }

  nLab = util.makeWrapperLabel("Selected Watchers", this._num);
  cLab = util.makeWrapperLabel("Use default watcher shout", this._check, false);
  tLab = util.makeWrapperLabel("Shout Text", this._text);

  util.style([tLab.firstElementChild, cLab, tLab, nLab.firstElementChild], {display: "block"});
  util.style([tLab, cLab, nLab], {marginBottom: "5px", fontSize: "1.1em"});

  this._check.addEventListener("change", this._handleDefCheckChange());

  a.wrap(this._htmlElement)
    .attribute("id", "octWatchShoutDiv")
    .addClass("octModal")
    .append(
    a.wrap("<form>")
      .style({margin: "25px"})
      .append(
      [
        a.wrap("<p>").style({fontSize: "1.1em"}).html("Warning: do not use this on slow connections!"),
        nLab,
        cLab,
        tLab,
        a.wrap("<div>").style({textAlign: "right"}).append([this._sendButton])
      ]
    )
  );
};

/**
 * Handle "Use Default Message" checkbox change
 *
 * @returns {Function}
 * @private
 */
octFAH.component.WatchShoutForm.prototype._handleDefCheckChange = function() {
  var t, s, e, c;
  s = this;
  e = this._app.getSettings();
  t = this._text;
  c = this._check;
  return function() {
    if (c.checked) {
      s.shoutText   = t.value() || "";
      t.attribute("disabled", "true").value(e.watchShoutText);
    } else {
      t.getElement().removeAttribute("disabled");
      if (s.shoutText.length) {t.value(s.shoutText);}
    }
  };
};