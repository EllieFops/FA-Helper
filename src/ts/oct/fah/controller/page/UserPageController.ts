///<reference path="../_.ts"/>
///<reference path="../../app/App.ts"/>
///<reference path="../module/SettingsMenuController.ts"/>
///<reference path="PageController.ts"/>
///<reference path="../ControllerInterface.ts"/>


namespace oct.fah.controller.page
{
  import App                    = oct.fah.app.App;
  import SettingsMenuController = oct.fah.controller.module.SettingsMenuController;

  /**
   * User Page Controller
   *
   * @author Elizabeth Harper
   *
   * @version 1.0
   * @since   0.7
   */
  export class UserPageController extends PageController implements ControllerInterface
  {

    constructor(app: App)
    {
      this.implementationOf("ControllerInterface");

      super(app);
    }

    /**
     * Initialize Controller
     */
    public init(): void
    {
      super.init();
    }

    /**
     * Run Controller
     */
    public run(): void
    {
      super.run();
    }

    /**
     * Get Settings Menu Controller
     *
     * @returns {oct.fah.controller.module.SettingsMenuController}
     */
    public getSettingsMenu(): SettingsMenuController
    {
      return super.getSettingsMenu();
    }
  }
}
