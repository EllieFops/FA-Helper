///<reference path="../_.ts"/>
///<reference path="..\ModalComponent.ts"/>
///<reference path="ShoutFormInterface.ts"/>
///<reference path="..\..\..\..\wrap\OctWrap.ts"/>
///<reference path="..\..\..\app\App.ts"/>
///<reference path="../SettingsMenu.ts"/>

namespace oct.fah.component.modal.shout
{
  import OctWrapFactory   = oct.wrap.OctWrapFactory;
  import OctWrapInterface = oct.wrap.OctWrapInterface;
  import HTML = oct.fah.util.help.HTML;

  export class ShoutForm extends ModalComponent implements ShoutFormInterface
  {
    protected title: OctWrapInterface;
    protected warning: OctWrapInterface;
    protected shoutText: OctWrapInterface;
    protected selCount: OctWrapInterface;
    protected useDefault: OctWrapInterface;
    protected submit: OctWrapInterface;

    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("ShoutFormInterface");
      super(app, app.getOctWrapFactory().wrapNew("<form>"));
    }

    public init(): void
    {
      var o: OctWrapFactory, h: HTML, form: OctWrapInterface;
      super.init();

      o = this.app.getOctWrapFactory();
      h = this.app.getHTMLHelper();

      form = this.content;

      form.addClass("octShoutForm");

      this.title      = o.wrapNew("<span>");
      this.warning    = o.wrapNew("<p>");
      this.shoutText  = o.wrapNew("<textarea>");
      this.selCount   = o.wrapNew("<input type=number disabled=disabled>");
      this.useDefault = o.wrapNew("<input type=checkbox>");
      this.submit     = o.wrapNew("<input type=button value='Send Shouts'>");

      form.append(
        [
          this.title,
          this.warning
        ]
      );

      form.append(
        [
          h.FORM.wrapperLabel(this.selCount, "Selected Users"),
          h.FORM.wrapperLabel(this.useDefault, "Use Default Shout Text", false),
          h.FORM.wrapperLabel(this.shoutText, "Shout Text"),
          o.wrapNew("div").append(this.submit).addClass("octRightAlign")
        ]
      );
    }

    public getShoutForm(): OctWrapInterface
    {
      return this.app.getOctWrapFactory().wrapNode(this.htmlElement);
    }

    public getTitleSpan(): OctWrapInterface
    {
      return this.title;
    }

    public getWarningText(): OctWrapInterface
    {
      return this.warning;
    }

    public getShoutTextArea(): OctWrapInterface
    {
      return this.shoutText;
    }

    public getSubmitButton(): OctWrapInterface
    {
      return this.submit;
    }

    public getDefaultCheckBox(): OctWrapInterface
    {
      return this.useDefault;
    }

    public getCountInput(): OctWrapInterface
    {
      return this.selCount;
    }
  }
}
