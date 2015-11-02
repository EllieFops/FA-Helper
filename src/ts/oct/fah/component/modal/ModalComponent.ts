///<reference path="../_.ts"/>
///<reference path="..\..\..\wrap\OctWrap.ts"/>
///<reference path="..\UIComponent.ts"/>
///<reference path="ModalComponentInterface.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.component.modal
{
  var curtain: wrap.OctWrap;

  export class ModalComponent extends UIComponent implements ModalComponentInterface
  {
    protected content: oct.wrap.OctWrap;

    constructor(app: oct.fah.app.App, content: oct.wrap.OctWrap)
    {
      this.implementationOf("ModalComponentInterface");
      this.content = content;
      super(app, document.createElement("div"));
    }

    public init(): void
    {
      var o: wrap.OctWrapFactory, s: wrap.OctWrap;

      super.init();

      o = this.app.getOctWrapFactory();

      if (!curtain) {
        curtain = o.wrapNew("<div>").addClass("octCurtain");
      }

      s = o.wrapNode(this.htmlElement).addClass("octModalContainer");

      this.content = o.wrapNew("<div>").addClass("octContent").appendTo(s);
    }

    public getContentDiv(): wrap.OctWrap
    {
      return this.content;
    }

    public getCurtain(): wrap.OctWrap
    {
      return curtain;
    }
  }
}
