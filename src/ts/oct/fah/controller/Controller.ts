///<reference path="../_.ts"/>
///<reference path="..\app\App.ts"/>
///<reference path="..\..\OctObject.ts"/>

namespace oct.fah.controller
{
  import App = oct.fah.app.App;

  export class Controller extends OctObject implements ControllerInterface

  {
    protected app: App;

    constructor(app: App)
    {
      this.implementationOf("ControllerInterface");
      this.app = app;
      super();
    }

    public init(): void
    {
    }

    public run(): void
    {
    }
  }
}
