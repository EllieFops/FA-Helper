///<reference path="../_.ts"/>
///<reference path="..\UIComponent.ts"/>
///<reference path="OverlayComponentInterface.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.component.overlay
{

  export class OverlayComponent extends UIComponent implements OverlayComponentInterface
  {
    constructor(app: oct.fah.app.App, element: HTMLElement)
    {
      this.implementationOf("OverlayComponentInterface");

      super(app, element);
    }

    public topLeft(x: number, y: number): void
    {
      this.htmlElement.style.top  = y.toString() + "px";
      this.htmlElement.style.left = x.toString() + "px";
    }

    public topRight(x: number, y: number): void
    {
      this.htmlElement.style.top   = y.toString() + "px";
      this.htmlElement.style.right = x.toString() + "px";
    }

    public bottomLeft(x: number, y: number): void
    {
      this.htmlElement.style.bottom = y.toString() + "px";
      this.htmlElement.style.left   = x.toString() + "px";
    }

    public bottomRight(x: number, y: number): void
    {
      this.htmlElement.style.bottom = y.toString() + "px";
      this.htmlElement.style.right  = x.toString() + "px";
    }

    public show(): void
    {
      this.htmlElement.classList.add("show");
    }

    public hide(): void
    {
      this.htmlElement.classList.remove("show");
    }

    public init(): void
    {
      super.init();
      this.htmlElement.classList.add("octOverlay");
    }
  }
}
