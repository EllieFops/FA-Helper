/**
 * Settings Menu Component
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.component
 */
octFAH.component.SettingsMenu = (function ()
{
  var
    _app,
    _self
    ;

  /**
   * Settings Menu
   *
   * @param app {Application}
   *
   * @constructor
   */
  function SettingsMenu(app)
  {
    _self   = this;
    _app    = app;
    var div = document.createElement("div");

    octFAH.component.Component.call(this, app, div);
    /** @namespace octFAH.component.Component.prototype */

    init(this, div);
  }

  SettingsMenu.prototype = Object.create(octFAH.component.Component.prototype);

  function init(self, div)
  {
    initDiv(div);
    initForm(div);
    modUI(self);
  }

  function handleShow(self)
  {
    return function (e)
    {
      self.topLeft(e.clientY + 5, e.clientX + 5);
      self.show();
    };
  }

  function previewSizeChange(e)
  {
    _app.getSettings().previewSize = e.target.value;
    _app.pushSettings();
  }

  function previewToggle(e)
  {
    _app.getSettings().showPreviews = e.target.checked;
    _app.pushSettings();
  }

  /**
   * Make Needed Alterations to the Default UI
   */
  function modUI(self)
  {
    var el, but, li;
    but = document.createElement('a');

    but.setAttribute('class', 'octModalShow');
    but.addEventListener('click', handleShow(self));

    li = document.createElement('li');
    li.appendChild(but);

    el = document.querySelector("table.block-menu-top ul.dropdown-left li:nth-child(2)");

    if (!el) {
      el = document.querySelector('#nav li:nth-child(4)');
    } else {
      but.style.fontWeight = 'bold';
    }

    but.innerHTML    = 'Helper';
    but.style.cursor = 'pointer';
    but.style.color  = '#cfcfcf';

    el.parentNode.insertBefore(li, el);
  }

  function initDiv(div)
  {
    var title, u;

    u = _app.getHTMLUtil();

    div.setAttribute('class', 'octModalContent');

    u.applyStyle(
      div,
      {
        display:      "none",
        border:       "2px solid pink",
        position:     "absolute",
        zIndex:       "10000",
        padding:      "5px",
        borderRadius: "7px"
      }
    );

    title = u.makeSpan('FA Helper Settings');
    u.applyStyle(
      title,
      {fontWeight: "bold", fontSize: "1.2em", display: "block", textAlign: "center", padding: "0 20px 10px 20px"}
    );

    div.appendChild(title);

    document.querySelector('body').appendChild(div);
  }

  function initForm(div)
  {
    var form, util, select, i, labels, opt, check, text, v, sett;

    sett   = _app.getSettings();
    util   = _app.getHTMLUtil();
    v      = _app.getHelperUtil();
    form   = document.createElement('form');
    select = document.createElement('select');
    text   = document.createElement('textarea');
    check  = util.makeCheckBox("", "", _app.getSettings().showPreviews);

    util.appendChildren(
      form,
      [
        util.makeWrapperLabel("Enable Previews", check),
        util.makeWrapperLabel("Preview Size", select),
        util.makeWrapperLabel("Watcher Auto Shout Text", text)
      ]
    );

    text.addEventListener(
      'input', function ()
      {
        sett.watchShoutText = text.value || "";
        _app.pushSettings();
      }
    );

    text.value        = sett.watchShoutText || "";
    text.style.width  = "200px";
    text.style.height = "5em";

    // Check
    check.addEventListener('change', previewToggle);

    // Select
    select.setAttribute('id', 'octPrevSizeSel');
    select.addEventListener('change', previewSizeChange);

    // Select Options
    for (i = 200; i <= 400; i += 100) {
      opt = util.makeSelectOption(i, v.toPx(i));
      if (i === sett.previewSize || i.toString() === sett.previewSize.toString()) {
        opt.setAttribute('selected', 'selected');
      }
      select.appendChild(opt);
    }

    // Style Labels
    labels = form.querySelectorAll('label > span');
    for (i = 0; i < labels.length; i++) {
      labels[i].parentNode.style.display      = 'block';
      labels[i].parentNode.style.marginBottom = '5px';

      util.applyStyle(labels[i], {display: "block", padding: "5px", fontSize: "1.1em", width: "200px"});
    }

    div.appendChild(form);
  }

  return SettingsMenu;
})();