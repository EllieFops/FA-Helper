///<reference path="../_.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\module\SettingsMenuController.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.page
{
  export class PageController extends Controller implements ControllerInterface
  {
    private settingsMenu: oct.fah.controller.module.SettingsMenuController;

    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("ControllerInterface");
      super(app);
    }

    public init(): void
    {
      super.init();

      this.settingsMenu = new oct.fah.controller.module.SettingsMenuController(this.app);
      this.settingsMenu.init();
    }

    public run(): void
    {
      super.run();

      this.settingsMenu.run();
    }

    public getSettingsMenu(): oct.fah.controller.module.SettingsMenuController
    {
      return this.settingsMenu;
    }
  }
}
