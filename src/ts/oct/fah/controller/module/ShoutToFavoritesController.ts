///<reference path="../_.ts"/>
///<reference path="MessagesShoutController.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\component\modal\shout\NewFavoriteShoutForm.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.module
{
  export class ShoutToFavoritesController
  extends MessagesShoutController <ShoutToFavoritesController>
  implements ControllerInterface
  {
    constructor(app: oct.fah.app.App)
    {
      super(app, "#messages-favorites", new component.modal.shout.NewFavoriteShoutForm(app));
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
