///<reference path="../_.ts"/>
///<reference path="ComponentInterface.ts"/>

namespace oct.fah.component
{
  export interface UIComponentInterface extends ComponentInterface
  {
    /**
     * Show the current UI element
     */
    show(): void;

    /**
     * Hide the current UI Element
     */
    hide(): void;
  }
}
