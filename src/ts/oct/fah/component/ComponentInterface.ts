///<reference path="../_.ts"/>
///<reference path="..\..\OctObjectInterface.ts"/>

namespace oct.fah.component {
  export interface ComponentInterface extends OctObjectInterface
  {
    /**
     * Get the backing HTML Element for this Component
     */
    getElement(): HTMLElement;
  }
}
