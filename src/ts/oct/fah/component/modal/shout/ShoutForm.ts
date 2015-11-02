///<reference path="../_.ts"/>
///<reference path="..\ModalComponent.ts"/>
///<reference path="ShoutFormInterface.ts"/>
///<reference path="..\..\..\..\wrap\OctWrap.ts"/>
///<reference path="..\..\..\app\App.ts"/>

namespace oct.fah.component.modal.shout
{
  export class ShoutForm extends ModalComponent implements ShoutFormInterface
  {
    protected form: wrap.OctWrap;
    protected title: wrap.OctWrap;
    protected warning: wrap.OctWrap;
    protected shoutText: wrap.OctWrap;
    protected selCount: wrap.OctWrap;
    protected useDefault: wrap.OctWrap;
    protected submit: wrap.OctWrap;

    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("ShoutFormInterface");
      super(app, app.getOctWrapFactory().wrapNew("<form>"));
    }

    public init(): void
    {
      var o: wrap.OctWrapFactory, h: util.help.HTML;
      super.init();

      o = this.app.getOctWrapFactory();
      h = this.app.getHTMLHelper();

      this.form.addClass("octShoutForm");

      this.title      = o.wrapNew("<span>");
      this.warning    = o.wrapNew("<p>");
      this.shoutText  = o.wrapNew("<textarea>");
      this.selCount   = o.wrapNew("<input type=number disabled=disabled>");
      this.useDefault = o.wrapNew("<input type=checkbox>");
      this.submit     = o.wrapNew("<input type=button value='Send Shouts'>");

      this.content.append(
        [
          this.title,
          this.warning,
          this.form
        ]
      );

      this.form.append(
        [
          h.FORM.wrapperLabel(this.selCount, "Selected"),
          h.FORM.wrapperLabel(this.useDefault, "Use Default Shout Text", false),
          h.FORM.wrapperLabel(this.shoutText, "Shout Text"),
          o.wrapNew("div").append(this.submit).addClass("octRightAlign")
        ]
      );
    }

    public getShoutForm(): wrap.OctWrap
    {
      return this.form;
    }

    public getTitleSpan(): wrap.OctWrap
    {
      return this.title;
    }

    public getWarningText(): wrap.OctWrap
    {
      return this.warning;
    }

    public getShoutTextArea(): wrap.OctWrap
    {
      return this.shoutText;
    }

    public getSubmitButton(): wrap.OctWrap
    {
      return this.submit;
    }

    public getDefaultCheckBox(): wrap.OctWrap
    {
      return this.useDefault;
    }

    public getCountInput(): wrap.OctWrap
    {
      return this.selCount;
    }
  }
}
