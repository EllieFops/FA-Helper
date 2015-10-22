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
    _div,
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
    _self = this;
    _app  = app;
    _div  = document.createElement("div");

    init();
  }

  function show(e)
  {
    var u = _app.getUtil();
    u.applyStyle(_div, {padding: "5px", top: u.toPx(e.clientY + 5), left: u.toPx(e.clientX - 25), display: "block"});
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

  function init()
  {
    initDiv();
    initForm();
    modUI();
  }

  /**
   * Make Needed Alterations to the Default UI
   */
  function modUI()
  {
    var el, but, li;
    but = document.createElement('a');

    but.setAttribute('class', 'octModalShow');
    but.addEventListener('click', show);

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

  function initDiv()
  {
    var title, ts, u;

    u = _app.getUtil();

    _div.setAttribute('class', 'octModalContent');

    u.applyStyle(
      _div,
      {display: "none", border: "2px solid pink", position: "absolute", zIndex: 10000}
    );

    title = u.makeSpan('FA Helper Settings');
    u.applyStyle(
      title,
      {fontWeight: "bold", fontSize: "1.2em", display: "block", textAlign: "center", padding: "0 20px 10px 20px"}
    );

    _div.appendChild(title);

    document.querySelector('body').appendChild(_div);
  }

  function initForm()
  {
    var form, util, select, i, labels, opt, check, text;

    util   = _app.getUtil();
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
        _app.getSettings().watchShoutText = text.value || "";
        _app.pushSettings()
      }
    );

    text.style.width  = "200px";
    text.style.height = "5em";

    // Check
    check.addEventListener('change', previewToggle);

    // Select
    select.setAttribute('id', 'octPrevSizeSel');
    select.addEventListener('change', previewSizeChange);

    // Select Options
    for (i = 200; i <= 400; i += 100) {
      opt = util.makeSelectOption(i, util.toPx(i));
      if (i == _app.getSettings().previewSize) {
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

    _div.appendChild(form);
  }

  return SettingsMenu;
})();