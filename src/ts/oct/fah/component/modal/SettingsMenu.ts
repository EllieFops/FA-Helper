///<reference path="_.ts"/>
///<reference path="../../app/App.ts"/>
///<reference path="../../util/help/HTML.ts"/>
///<reference path="../../../wrap/OctWrapFactory.ts"/>
///<reference path="../../../wrap/OctWrapInterface.ts"/>
///<reference path="../module/tab/TabInterface.ts"/>
///<reference path="../module/tab/TabSet.ts"/>
///<reference path="../../controller/module/TabSetController.ts"/>
///<reference path="../module/tab/TabSetInterface.ts"/>
///<reference path="ModalComponentInterface.ts"/>
///<reference path="ModalComponent.ts"/>

namespace oct.fah.component.modal
{
  import App              = oct.fah.app.App;
  import HTML             = oct.fah.util.help.HTML;
  import OctWrapFactory   = oct.wrap.OctWrapFactory;
  import OctWrapInterface = oct.wrap.OctWrapInterface;
  import TabInterface     = oct.fah.component.module.tab.TabInterface;
  import TabSet           = oct.fah.component.module.tab.TabSet;
  import TabSetController = oct.fah.controller.module.TabSetController;
  import TabSetInterface  = oct.fah.component.module.tab.TabSetInterface;

  export class SettingsMenu extends ModalComponent implements ModalComponentInterface
  {
    private tabSet:   TabSetInterface;
    private status:   OctWrapInterface;
    private togPrev:  OctWrapInterface;
    private prevSize: OctWrapInterface;
    private favText:  OctWrapInterface;
    private watText:  OctWrapInterface;

    constructor(app: App, controller: TabSetController)
    {
      this.implementationOf("ModalComponentInterface");
      this.tabSet = controller.getModule();
      super(app, app.getOctWrapFactory().wrapNew("<div>"));
    }

    public init(): void
    {
      var tTab: TabInterface, o: OctWrapFactory, h: HTML;
      super.init();

      h = this.app.getHTMLHelper();
      o = this.app.getOctWrapFactory();

      this.status   = o.wrapNew("<span>");
      this.togPrev  = o.wrapNew("<input type=checkbox name='octDisPrev'>");
      this.prevSize = o.wrapNew("<select name='octPrevSize'>").append(
        [
          o.wrapNew("<option value='200'>200px</option>"),
          o.wrapNew("<option value='300'>400px</option>"),
          o.wrapNew("<option value='300'>400px</option>"),
        ]
      );
      this.favText  = o.wrapNew("<textarea name='octFavShout'>");
      this.watText  = o.wrapNew("<textarea name='octWatShout'>");


      tTab = this.tabSet.createTab("Basic");

      this.tabSet.appendTab(tTab);

      o.wrapNode(tTab.getElement()).append(
        [
          o.wrapNew("fieldset").append(
            [
              o.wrapNew("legend").setHTML("Hover Preview Options"),
              h.FORM.wrapperLabel(this.togPrev, "Enable Hover Preview", false),
              h.FORM.wrapperLabel(this.prevSize, "Preview Size")
            ]
          )
        ]
      );

      tTab = this.tabSet.createTab("Messages");
      this.tabSet.appendTab(tTab);
      o.wrapNode(tTab.getElement()).append(
        [
          h.FORM.wrapperLabel(this.favText, "New Favorite Mass Shout Text"),
          h.FORM.wrapperLabel(this.watText, "New Watcher Mass Shout Text")
        ]
      );

      this.content.append(this.tabSet.getElement());
    }

    public getNewFavTextArea(): oct.wrap.OctWrapInterface
    {
      return this.favText;
    }

    public getNewWatchTextArea(): oct.wrap.OctWrapInterface
    {
      return this.watText;
    }

    public getPrevSizeSelect(): oct.wrap.OctWrapInterface
    {
      return this.prevSize;
    }

    public getPreviewToggle(): oct.wrap.OctWrapInterface
    {
      return this.togPrev;
    }
  }
}
