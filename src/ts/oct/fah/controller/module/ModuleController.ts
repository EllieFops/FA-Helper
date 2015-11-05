///<reference path="../_.ts"/>
///<reference path="../../component/ComponentInterface.ts"/>
///<reference path="../Controller.ts"/>
///<reference path="ModuleControllerInterface.ts"/>

namespace oct.fah.controller.module
{
  import ComponentInterface = oct.fah.component.ComponentInterface;

  export class ModuleController <T extends ComponentInterface>
  extends      Controller
  implements   ModuleControllerInterface <T>
  {
    protected module: T;

    constructor(app: oct.fah.app.App, mod: T)
    {
      this.module = mod;
      super(app);
    }

    getModule(): T
    {
      return this.module;
    }
  }
}
