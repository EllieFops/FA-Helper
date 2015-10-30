///<reference path="../_.ts"/>
///<reference path="..\..\OctObjectInterface.ts"/>

namespace oct.fah.controller
{
  export interface ControllerInterface extends OctObjectInterface
  {
    init(): void;
    run(): void;
  }
}
