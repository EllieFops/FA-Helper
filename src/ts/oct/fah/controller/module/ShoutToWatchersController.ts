///<reference path="../_.ts"/>
///<reference path="MessagesShoutController.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\component\modal\shout\NewWatchersShoutForm.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.module
{
  export class ShoutToWatchersController
  extends MessagesShoutController <ShoutToWatchersController>
  implements ControllerInterface
  {

    constructor(app: oct.fah.app.App)
    {
      super(app, "#messages-watches", new component.modal.shout.NewWatchersShoutForm(app));
    }

    public init(): void
    {
      super.init();
    }

    public run(): void
    {
      super.run();
    }
  }
}
