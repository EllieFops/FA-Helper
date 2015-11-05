///<reference path="../_.ts"/>
///<reference path="../../app/App.ts"/>
///<reference path="../../component/modal/SettingsMenu.ts"/>
///<reference path="../../../wrap/OctWrapInterface.ts"/>
///<reference path="../../app/SettingsManager.ts"/>
///<reference path="../../app/Settings.ts"/>
///<reference path="../../util/InterruptableTimeout.ts"/>
///<reference path="ModalComponentController.ts"/>
///<reference path="../ControllerInterface.ts"/>

namespace oct.fah.controller.module
{
  import App                  = oct.fah.app.App;
  import SettingsMenu         = oct.fah.component.modal.SettingsMenu;
  import OctWrapInterface     = oct.wrap.OctWrapInterface;
  import SettingsManager      = oct.fah.app.SettingsManager;
  import Settings             = oct.fah.app.Settings;
  import InterruptableTimeout = oct.fah.util.InterruptableTimeout;

  export class SettingsMenuController extends ModalComponentController implements ControllerInterface
  {
    private toggle: OctWrapInterface;
    private tabSet: TabSetController;

    constructor(app: App)
    {
      this.implementationOf("ControllerInterface");

      this.tabSet = new TabSetController(app);

      super(app, new SettingsMenu(app, this.tabSet));
    }

    public init(): void
    {
      var e: SettingsMenu;


      // Create Elements
      this.toggle = this.app.getOctWrapFactory()
        .wrapNew("<span.octShowSettingsMenu.octGearSVG>")
        .setHTML('&nbsp;')
        .click(this.handleShowSettingsMenu());

      super.init();


      // Latch Onto Inputs
      e = <SettingsMenu> this.component;

      e.getPreviewToggle().click(this.handlePreviewToggle());
      e.getPrevSizeSelect().change(this.handlePrevSizeChange());
      e.getNewFavTextArea().input(this.handleFavTextChange());
      e.getNewWatchTextArea().input(this.handleWatchTextChange());
    }

    public run(): void
    {
      super.run();
      this.modUI();
    }

    private modUI(): void
    {
      var y: number;
      y = document.querySelector("table.block-menu-top").getBoundingClientRect().bottom;
      this.toggle.style({"top": y.toString() + "px"}).appendTo("body");
    }

    /**
     * Handle Toggling Hover Previews
     *
     * @returns {function(): void}
     */
    private handlePreviewToggle(): EventListener
    {
      var tog: OctWrapInterface, sett: SettingsManager;
      tog  = (<SettingsMenu> this.component).getPreviewToggle();
      sett = this.app.getSettings();

      return function (): void
      {
        sett.putSetting(Settings.HOVER_PREVIEW_ENABLED, tog.matches(":checked"));
      };
    }

    /**
     * Handle Changing Hover Preview Size
     *
     * @returns {function(): void}
     */
    private handlePrevSizeChange(): EventListener
    {
      var sel: OctWrapInterface, sett: SettingsManager;
      sel  = (<SettingsMenu> this.component).getPrevSizeSelect();
      sett = this.app.getSettings();

      return function (): void
      {
        sett.putSetting(Settings.HOVER_PREVIEW_SIZE, sel.getValue());
      };
    }

    /**
     * Handle Default New Favorite Shout Text Change
     *
     * @returns {function(): void}
     */
    private handleFavTextChange(): EventListener
    {
      var sett: SettingsManager, timer: InterruptableTimeout, text: OctWrapInterface;

      sett  = this.app.getSettings();
      timer = new InterruptableTimeout(500);
      text  = (<SettingsMenu> this.component).getNewFavTextArea();

      timer.addCallBack(
        function (): void
        {
          sett.putSetting(Settings.NEW_FAVORITE_SHOUT, text.getValue());
        }
      );

      return function (): void
      {
        timer.restart();
      };
    }

    /**
     * Handle Default New Watcher Shout Text Change
     *
     * @returns {function(): void}
     */
    private handleWatchTextChange(): EventListener
    {
      var sett: SettingsManager, timer: InterruptableTimeout, text: OctWrapInterface;

      sett  = this.app.getSettings();
      timer = new InterruptableTimeout(500);
      text  = (<SettingsMenu> this.component).getNewWatchTextArea();

      timer.addCallBack(
        function (): void
        {
          sett.putSetting(oct.fah.app.Settings.NEW_WATCHER_SHOUT, text.getValue());
        }
      );

      return function (): void
      {
        timer.restart();
      };
    }

    private handleShowSettingsMenu(): EventListener
    {
      var self = this;
      return function (): void
      {
        self.component.show();
      };
    }
  }
}
