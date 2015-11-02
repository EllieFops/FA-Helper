///<reference path="../_.ts"/>
///<reference path="..\..\app\App.ts"/>
///<reference path="..\..\..\wrap\OctWrap.ts"/>

namespace oct.fah.util.help
{
  class FormHelper
  {
    private app: app.App;

    constructor(app: app.App)
    {
      this.app = app;
    }

    public wrapperLabel(e: oct.wrap.OctWrapInterface, t: string, b?: boolean): oct.wrap.OctWrap
    {
      var l: oct.wrap.OctWrap, s: oct.wrap.OctWrap;

      l = this.app.getOctWrapFactory().wrapNew("<label>");
      s = this.app.getOctWrapFactory().wrapNew("<span>").setHTML(t);

      if (b === false) {
        l.append([e, s]);
      } else {
        l.append([s, e]);
      }

      s = null;
      if (e instanceof oct.wrap.OctWrap) {
        return l;
      }
    }
  }

  export class HTML
  {
    public FORM: FormHelper;
    protected app: app.App;

    constructor(app: app.App)
    {
      this.app  = app;
      this.FORM = new FormHelper(app);
    }
  }

}
