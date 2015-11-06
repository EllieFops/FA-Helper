///<reference path="../_.ts"/>
///<reference path="../../app/App.ts"/>
///<reference path="../../component/module/tab/TabSet.ts"/>
///<reference path="../../component/module/tab/TabSetInterface.ts"/>
///<reference path="ModuleController.ts"/>
///<reference path="ModuleControllerInterface.ts"/>

namespace oct.fah.controller.module
{
  import tab = oct.fah.component.module.tab;
  import App = oct.fah.app.App;
  import TabSetInterface = oct.fah.component.module.tab.TabSetInterface;
  import TabSet = oct.fah.component.module.tab.TabSet;

  export class TabSetController
  extends      ModuleController <TabSetInterface>
  implements   ModuleControllerInterface <TabSetInterface>
  {
    constructor(app: App)
    {
      this.implementationOf("ModuleControllerInterface");
      super(app, new TabSet(app));
    }

    public init(): void
    {
      super.init();
      this.module.getTabRow().click(this.handleTabHeaderClick());
    }

    private handleTabHeaderClick(): EventListener
    {
      var self: TabSetController = this;
      return function (e: MouseEvent): void
      {
        var targ: HTMLElement;
        targ = <HTMLElement> e.target;
        if (!targ.hasAttribute(tab.TAB_ID_ATTRIBUTE)) {
          return;
        }

        self.getModule().selectTab(targ.getAttribute(tab.TAB_ID_ATTRIBUTE));
      };
    }
  }
}
