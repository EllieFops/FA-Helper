///<reference path="../_.ts"/>
///<reference path="..\..\..\wrap\OctWrapInterface.ts"/>
///<reference path="..\..\component\modal\SettingsMenu.ts"/>
///<reference path="ModalComponentController.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.module
{
  export class SettingsMenuController extends ModalComponentController implements ControllerInterface
  {
    private toggle: oct.wrap.OctWrapInterface;
    private menu: oct.fah.component.modal.SettingsMenu;

    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("ControllerInterface");
      super(app);
    }

    public init(): void
    {
      var e: oct.wrap.OctWrapInterface;

      // Create Elements
      this.toggle = this.app.getOctWrapFactory().wrapNew("<span class=octShowSettingsMenu>").setHTML('@@svg-gear');
      this.menu   = new oct.fah.component.modal.SettingsMenu(this.app);

      super.init();


      // Latch Onto Inputs
      this.menu.getPreviewToggle().click(this.handlePreviewToggle());
      this.menu.getPrevSizeSelect().change(this.handlePrevSizeChange());
      this.menu.getNewFavTextArea().input(this.handleFavTextChange());
      this.menu.getNewWatchTextArea().input(this.handleWatchTextChange());
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

    private handlePreviewToggle(): EventListener
    {
      var self: SettingsMenuController = this;

      return function (): void
      {
        if (this.menu.getPreviewToggle().matches(":checked")) {
          // ToDo: Store Setting
        }
      };
    }

    private handlePrevSizeChange(): EventListener
    {
      var self: SettingsMenuController = this;

      return function (): void
      {
        // ToDo: Store Setting
      };
    }

    private handleFavTextChange(): EventListener
    {
      return function (): void
      {
      };
    }

    private handleWatchTextChange(): EventListener
    {
      return function (): void
      {
      };
    }
  }
}
