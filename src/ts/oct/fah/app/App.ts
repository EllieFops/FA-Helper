///<reference path="_.ts"/>
///<reference path="..\util\Router.ts"/>
///<reference path="..\..\wrap\OctWrapFactory.ts"/>
///<reference path="..\util\help\HTML.ts"/>
///<reference path="StaticConfig.ts"/>
///<reference path="..\util\StorageManagerInterface.ts"/>
///<reference path="boot\CSSInjector.ts"/>
///<reference path="..\controller\page\BrowseController.ts"/>
///<reference path="..\controller\page\SearchController.ts"/>
///<reference path="..\controller\page\SubmissionController.ts"/>
///<reference path="..\controller\page\MessageController.ts"/>
///<reference path="SettingsManager.ts"/>
///<reference path="../controller/page/UserPageController.ts"/>
///<reference path="../util/Util.ts"/>

namespace oct.fah.app
{
  import boot                    = oct.fah.app.boot;
  import BrowseController        = oct.fah.controller.page.BrowseController;
  import MessageController       = oct.fah.controller.page.MessageController;
  import SearchController        = oct.fah.controller.page.SearchController;
  import SubmissionController    = oct.fah.controller.page.SubmissionController;
  import UserPageController      = oct.fah.controller.page.UserPageController;
  import HTML                    = oct.fah.util.help.HTML;
  import Router                  = oct.fah.util.Router;
  import StorageManager          = oct.fah.util.StorageManager;
  import StorageManagerInterface = oct.fah.util.StorageManagerInterface;
  import Util                    = oct.fah.util.Util;
  import OctWrapFactory          = oct.wrap.OctWrapFactory;

  /**
   * Application
   *
   * @author Elizabeth Harper
   *
   * @version 2.0
   * @since   0.2
   */
  export class App
  {
    /**
     * Internal Router
     */
    private router: Router;

    /**
     * OctWrapper Factory
     */
    private octFac: OctWrapFactory;

    /**
     * HTML Generation Helper
     */
    private htHelp: HTML;

    /**
     * Static Coniguration
     */
    private config: StaticConfig;

    /**
     * Browser Storage Interface
     */
    private stoMan: StorageManagerInterface;

    /**
     * Settings Management
     */
    private setMan: SettingsManager;

    /**
     * General Helper Utilities
     */
    private util:   Util;

    constructor()
    {
      this.boot();
      this.init();
      this.run();
    }

    /**
     * Get OctWrapFactory
     *
     * @returns {OctWrapFactory}
     */
    public getOctWrapFactory(): OctWrapFactory
    {
      return this.octFac;
    }

    /**
     * Get HTML Helper
     *
     * @returns {HTML}
     */
    public getHTMLHelper(): HTML
    {
      return this.htHelp;
    }

    /**
     * Get Static Configuration
     *
     * @returns {StaticConfig}
     */
    public getConfig(): StaticConfig
    {
      return this.config;
    }

    /**
     * Get Storage Interface
     *
     * @returns {StorageManagerInterface}
     */
    public getStorageManager(): StorageManagerInterface
    {
      return this.stoMan;
    }

    /**
     * Get Settings Manager
     *
     * @returns {SettingsManager}
     */
    public getSettings(): SettingsManager
    {
      return this.setMan;
    }

    /**
     * Get Helper Utilities
     *
     * @returns {Util}
     */
    public getUtilities(): Util
    {
      return this.util;
    }

    /**
     * Boot Application
     */
    private boot(): void
    {
      oct.fah.app.boot.CSSInjector.injectCSS();

      this.router = new Router();
      this.octFac = new OctWrapFactory();
      this.htHelp = new HTML(this);
      this.config = new StaticConfig();
      this.stoMan = new StorageManager();
      this.setMan = new SettingsManager(this.stoMan);
      this.util   = new Util();
    }

    /**
     * Initialize Application
     */
    private init(): void
    {
      this.setMan.init();

      this.router.register("/browse/", new BrowseController(this));
      this.router.register("/search/", new SearchController(this));
      this.router.register("/msg/submissions/", new SubmissionController(this));
      this.router.register("/msg/others/", new MessageController(this));
      this.router.register("/user/", new UserPageController(this))
    }

    /**
     * Run Application
     */
    private run(): void
    {
      this.router.route(window.location.pathname);
    }
  }
}
