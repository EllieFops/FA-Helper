///<reference path="../_.ts"/>
///<reference path="..\..\component\overlay\HoverPreview.ts"/>
///<reference path="..\Controller.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\app\App.ts"/>
///<reference path="../../app/Settings.ts"/>
///<reference path="../../app/SettingsManager.ts"/>

namespace oct.fah.controller.module
{

  import Settings = oct.fah.app.Settings;
  import SettingsManager = oct.fah.app.SettingsManager;

  export class HoverPreviewController extends Controller implements ControllerInterface
  {
    private preview: component.overlay.HoverPreview;

    constructor(app: oct.fah.app.App)
    {
      super(app);
    }

    public init(): void
    {
      var a: NodeList, i: number;

      super.init();

      this.preview = new oct.fah.component.overlay.HoverPreview(this.app);

      a = document.querySelectorAll("b img");

      for (i = 0; i < a.length; i++) {
        a[i].addEventListener("mouseover", this.handleMouseOver());
        a[i].addEventListener("mousemove", this.handleMouseMove());
        a[i].addEventListener("mouseout", this.handleMouseOut());
      }
    }

    public run(): void
    {
      super.run();
      document.querySelector("body").appendChild(this.preview.getElement());
    }

    private handleMouseOver(): EventListener
    {
      var self: HoverPreviewController, sett: SettingsManager;
      self = this;
      sett = this.app.getSettings();

      return function (e: MouseEvent): void
      {
        if (!sett.getBooleanSetting(Settings.HOVER_PREVIEW_ENABLED)) {
          return;
        }

        self.preview.show();
        self.preview.getImage().setAttribute(
          "src",
          (<Element> e.target).getAttribute("src").replace("@200", "@" + sett.getNumberSetting(Settings.HOVER_PREVIEW_SIZE))
        );
      };
    }

    private handleMouseMove(): EventListener
    {
      var self: HoverPreviewController, sett: SettingsManager;
      self = this;
      sett = this.app.getSettings();

      return function (e: MouseEvent): void
      {
        var x: number, y: number, i: ClientRect;
        if (!sett.getBooleanSetting(Settings.HOVER_PREVIEW_ENABLED)) {
          return;
        }

        i = self.preview.getImage().getBoundingClientRect();

        x = e.clientX + window.scrollX + 30;
        if (x + i.width > window.innerWidth) {
          x = e.clientX + window.scrollX - i.width - 30;
        }

        y = (e.clientY - i.height / 2) + window.scrollY;

        if (y < window.scrollY) {
          y += window.scrollY - y;
        } else if (y + i.height > window.innerHeight + window.scrollY) {
          y -= y + i.height - (window.innerHeight + window.scrollY);
        }

        self.preview.topLeft(x, y);
      };
    }

    private handleMouseOut(): EventListener
    {
      var self: HoverPreviewController = this;
      return function (): void
      {
        self.preview.hide();
      };
    }
  }
}
