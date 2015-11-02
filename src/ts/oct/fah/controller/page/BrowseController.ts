///<reference path="../_.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\module\HoverPreviewController.ts"/>
///<reference path="..\..\app\App.ts"/>
///<reference path="PageController.ts"/>

namespace oct.fah.controller.page
{
  export class BrowseController extends PageController implements ControllerInterface
  {
    private hoverView: controller.module.HoverPreviewController;

    constructor(app: oct.fah.app.App)
    {
      super(app);
    }

    public init(): void
    {
      super.init();

      this.hoverView = new oct.fah.controller.module.HoverPreviewController(this.app);
      this.hoverView.init();
    }

    public run(): void
    {
      super.run();

      this.hoverView.run();
    }
  }
}
