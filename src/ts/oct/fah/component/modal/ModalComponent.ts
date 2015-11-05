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
        curtain = o.wrapNew("<div>")
          .addClasses(["octCurtain", "octModal", "octDisplayNone"])
          .click(
          function () {
            var i: number, a: NodeList;
            a = document.querySelectorAll(".octModal");

            for (i = 0; i < a.length; i++) {
              o.wrapNode(a.item(i)).addClass("octDisplayNone").dropClass("octDisplayBlock");
            }
          });
      }

      s = o.wrapNode(this.htmlElement).addClasses(["octModalContainer", "octModal"]);

      this.content = o.wrapNew("<div>").addClass("octContent").appendTo(s);

      o.wrapSelector("body").append(curtain);
    }

    public getContentDiv(): wrap.OctWrap
    {
      return this.content;
    }

    public getCurtain(): wrap.OctWrap
    {
      return curtain;
    }

    public show(): void
    {
      super.show();
      this.htmlElement.classList.add("octDisplayBlock");
      curtain.addClass("octDisplayBlock").dropClass("octDisplayNone");
    }
  }
}
