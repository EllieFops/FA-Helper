///<reference path="../_.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\..\component\modal\ModalComponentInterface.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.module
{
  var clicker: boolean = false;

  export class ModalComponentController extends Controller implements ControllerInterface
  {
    protected component: component.modal.ModalComponentInterface;

    constructor(app: oct.fah.app.App)
    {
      super(app);
    }

    public init(): void
    {
      super.init();

      this.component.getCurtain().click();
    }

    private handleCurtainClick(): EventListener
    {
      var self: ModalComponentController = this;

      return function (): void
      {
        self.component.hide();
      };
    }
  }
}
