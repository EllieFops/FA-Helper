///<reference path="../_.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\module\ShoutToWatchersController.ts"/>
///<reference path="..\module\ShoutToFavoritesController.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.page
{
  import ShoutToWatchersController  = oct.fah.controller.module.ShoutToWatchersController;
  import ShoutToFavoritesController = oct.fah.controller.module.ShoutToFavoritesController;
  import App                        = oct.fah.app.App;

  export class MessageController extends PageController implements ControllerInterface
  {
    private watchShout: ShoutToWatchersController;
    private favShout: ShoutToFavoritesController;

    constructor(app: App)
    {
      super(app);
    }

    public init(): void
    {
      super.init();

      this.watchShout = new ShoutToWatchersController(this.app);
      this.favShout   = new ShoutToFavoritesController(this.app);

      this.watchShout.init();
      this.favShout.init();
    }

    public run(): void
    {
      super.run();

      this.watchShout.run();
      this.favShout.run();
    }
  }
}
