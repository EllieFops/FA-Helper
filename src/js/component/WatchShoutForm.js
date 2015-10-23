/**
 * Watch Shout Component
 *
 * Modal form for submitting mass shouts to watchers.
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @augments  ModalComponent
 * @namespace octFAH.component
 */
octFAH.component.WatchShoutForm = (function ()
{
  /**
   * Application
   *
   * @type {octFAH.core.Application|Application}
   */
  var _app;

  /**
   * Checkbox Input
   *
   * @type {Element}
   */
  var _check;

  /**
   * Div
   *
   * @type {Element}
   */
  var _div;

  /**
   * TextArea Input
   *
   * @type {Element}
   */
  var _text;

  /**
   * Number Input
   *
   * @type {Element}
   */
  var _num;

  /**
   * Image Hover Preview
   *
   * @param app {octFAH.core.Application|Application}
   *
   * @augments  ModalComponent
   *
   * @constructor
   */
  function WatchShoutForm(app)
  {
    _div   = document.createElement("div");
    _text  = document.createElement("textarea");
    _check = null;
    _app   = app;

    octFAH.component.ModalComponent.call(this, app, _div);
    init(this);
  }

  WatchShoutForm.prototype = Object.create(octFAH.component.ModalComponent.prototype);

  function init()
  {
    setupForm();
  }

  /**
   * Construct the Shout to new Watchers form.
   */
  function setupForm()
  {
    var form, send, sett, curText, util, cLab, tLab, bDiv, para, nLab;

    _num = _app
      .wrap("input")
      .attributes({disabled: "disabled", type: "number", "default": "0"})
      .applyStyle({width: "25px"})
      .getElement();

    util    = _app.getHTMLUtil();
    sett    = _app.getSettings();
    curText = "";
    form    = _app.wrap("form").applyStyle({margin: "25px"}).getElement();
    bDiv    = document.createElement("div");
    para    = _app.wrap("p").applyStyle({fontSize: "1.1em"}).getElement();
    nLab    = util.makeWrapperLabel("Selected Watchers", _num);
    _check  = util.makeCheckBox("", "", (sett.watchShoutText.length > 4));
    cLab    = util.makeWrapperLabel("Use default watcher shout", _check, false);
    tLab    = util.makeWrapperLabel("Shout Text", _text);

    util.applyStyle([tLab.firstElementChild, cLab, tLab, nLab.firstElementChild], {display: "block"});
    util.applyStyle([tLab, cLab, nLab], {marginBottom: "5px", fontSize: "1.1em"});
    util.applyStyle(_text, {width: "200px", height: "8em"});

    send = util.makeButton("Send");

    _div.setAttribute("id", "octWatchShoutDiv");
    _div.setAttribute("class", "octModal");

    _check.addEventListener(
      "change",
      function ()
      {
        if (_check.checked) {
          _text.setAttribute("disabled", "disabled");
          curText     = _text.value || "";
          _text.value = sett.watchShoutText;
        } else {
          _text.removeAttribute("disabled");
          if (curText.length) {
            _text.value = curText;
          }
        }
      }
    );

    para.innerHTML = "Warning: do not use this on slow connections!";
    bDiv.appendChild(send);
    util.appendChildren(form, [para, nLab, cLab, tLab, bDiv]);
    _div.appendChild(form);
  }

  /**
   * Update Select Count
   *
   * @param num {int}
   */
  WatchShoutForm.prototype.setSelCount = function (num)
  {
    _num.value = num;
  };

  return WatchShoutForm;
})();