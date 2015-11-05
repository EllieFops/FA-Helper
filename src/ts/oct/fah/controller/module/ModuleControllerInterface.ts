///<reference path="../_.ts"/>
///<reference path="../ControllerInterface.ts"/>
///<reference path="../../component/ComponentInterface.ts"/>
///<reference path="../../component/Component.ts"/>

namespace oct.fah.controller.module
{
  import ComponentInterface = oct.fah.component.ComponentInterface;
  import Component = oct.fah.component.Component;

  export interface ModuleControllerInterface <T extends ComponentInterface> extends ControllerInterface
  {
    getModule(): T;
  }
}
