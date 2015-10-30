///<reference path="../_.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\module\ShoutToWatchersController.ts"/>
///<reference path="..\module\ShoutToFavoritesController.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.page
{
  export class MessageController extends Controller implements ControllerInterface
  {
    private watchShout: module.ShoutToWatchersController;
    private watchFav: module.ShoutToFavoritesController;

    constructor(app: oct.fah.app.App)
    {
      super(app);
    }

    public init(): void
    {
      super.init();

      this.watchShout.init();
      this.watchFav.init();
    }

    public run(): void
    {
      super.run();

      this.watchShout.run();
      this.watchFav.run();
    }
  }
}
