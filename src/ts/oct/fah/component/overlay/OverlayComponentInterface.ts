///<reference path="../_.ts"/>
///<reference path="..\UIComponentInterface.ts"/>

namespace oct.fah.component.overlay
{
  export interface OverlayComponentInterface extends UIComponentInterface
  {
    topLeft(x: number, y: number): void;
    topRight(x: number, y: number): void;
    bottomLeft(x: number, y: number): void;
    bottomRight(x: number, y: number): void;
  }
}
