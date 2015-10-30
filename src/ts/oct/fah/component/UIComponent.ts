///<reference path="../_.ts"/>
///<reference path="Component.ts"/>
///<reference path="UIComponentInterface.ts"/>
///<reference path="..\app\App.ts"/>

namespace oct.fah.component
{
  import App = oct.fah.app.App;

  export class UIComponent extends Component implements UIComponentInterface
  {
    protected app: App;

    constructor(app: App, element: HTMLElement)
    {
      this.implementationOf("UIComponentInterface");
      this.app = app;
      super(element);

      this.init();
    }

    public show(): void
    {
      this.htmlElement.style.display = "inherit";
    }

    public hide(): void
    {
      this.htmlElement.style.display = "none";
    }

    /**
     * Initialize This UI Component
     */
    protected init(): void
    {

    }
  }
}
