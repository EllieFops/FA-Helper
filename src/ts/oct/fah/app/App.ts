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

namespace oct.fah.app
{
  import util = oct.fah.util;
  import controller = oct.fah.controller;
  import wrap = oct.wrap;
  import boot = oct.fah.app.boot;

  export class App
  {
    private router: util.Router;
    private octFac: wrap.OctWrapFactory;
    private htHelp: util.help.HTML;
    private config: StaticConfig;
    private stoMan: util.StorageManagerInterface;

    constructor()
    {
      this.boot();
      this.init();
      this.run();
    }

    public getOctWrapFactory(): wrap.OctWrapFactory
    {
      return this.octFac;
    }

    public getHTMLHelper(): util.help.HTML
    {
      return this.htHelp;
    }

    public getConfig(): StaticConfig
    {
      return this.config;
    }

    public getStorageManager(): util.StorageManagerInterface
    {
      return this.stoMan;
    }

    private boot(): void
    {
      oct.fah.app.boot.CSSInjector.injectCSS();

      this.router = new util.Router();
      this.octFac = new wrap.OctWrapFactory();
      this.htHelp = new util.help.HTML(this);
      this.config = new StaticConfig();
      // This.stoMan = new util.StorageManager();
    }

    private init(): void
    {
      this.router.register("/browse/", new controller.page.BrowseController(this));
      this.router.register("/search/", new controller.page.SearchController(this));
      this.router.register("/msg/submissions/", new controller.page.SubmissionController(this));
      this.router.register("/msg/others/", new controller.page.MessageController(this));
    }

    private run(): void
    {
      this.router.route(window.location.pathname);
    }
  }
}
