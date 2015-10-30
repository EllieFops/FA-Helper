///<reference path="../_.ts"/>
///<reference path="OverlayComponent.ts"/>
///<reference path="..\UIComponentInterface.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.component.overlay
{
  export class HoverPreview extends OverlayComponent implements UIComponentInterface
  {
    private img: HTMLImageElement;

    constructor(app: oct.fah.app.App)
    {
      super(app, document.createElement("div"));
    }

    public init(): void
    {
      super.init();
      this.img = document.createElement("img");
      this.app.getOctWrapFactory().wrapNode(this.htmlElement).append(this.img).addClass("octHoverPreview");
    }

    public getImage(): HTMLImageElement
    {
      return this.img;
    }
  }
}
