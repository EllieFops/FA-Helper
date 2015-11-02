///<reference path="../_.ts"/>
///<reference path="..\..\OctObject.ts"/>
///<reference path="ComponentInterface.ts"/>

namespace oct.fah.component {

  export class Component extends OctObject implements ComponentInterface
  {
    protected htmlElement: HTMLElement;

    constructor(element: HTMLElement)
    {
      this.htmlElement = element;
      this.implementationOf("ComponentInterface");
      super();
    }

    public getElement(): HTMLElement
    {
      return this.htmlElement;
    }
  }
}
