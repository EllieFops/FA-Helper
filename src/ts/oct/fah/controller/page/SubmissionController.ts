///<reference path="../_.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\ControllerInterface.ts"/>

namespace oct.fah.controller.page
{
  import HoverPreviewController = oct.fah.controller.module.HoverPreviewController;
  import App                    = oct.fah.app.App;

  /**
   * Submission Controller
   *
   * @author Elizabeth Harper
   *
   * @since   0.7
   * @version 1.0
   */
  export class SubmissionController extends PageController implements ControllerInterface
  {
    private hoverView: HoverPreviewController;

    constructor(app: App)
    {
      super(app);
    }

    /**
     * Initialize Controller
     */
    public init(): void
    {
      super.init();

      this.hoverView = new HoverPreviewController(this.app);
      this.hoverView.init();
    }

    /**
     * Run Controller
     */
    public run(): void
    {
      super.run();

      this.hoverView.run();
    }
  }
}
