///<reference path="_.ts"/>
///<reference path="..\module\tab\TabSetInterface.ts"/>
///<reference path="..\..\..\wrap\OctWrapInterface.ts"/>
///<reference path="ModalComponent.ts"/>
///<reference path="ModalComponentInterface.ts"/>
///<reference path="..\..\util\help\HTML.ts"/>
///<reference path="..\..\..\wrap\OctWrapFactory.ts"/>
///<reference path="..\module\tab\TabSet.ts"/>
///<reference path="..\module\tab\Tab.ts"/>

namespace oct.fah.component.modal
{
  import Tab = oct.fah.component.module.tab;

  export class SettingsMenu extends ModalComponent implements ModalComponentInterface
  {
    private tabSet: Tab.TabSetInterface;
    private status: oct.wrap.OctWrapInterface;
    private togPrev: oct.wrap.OctWrapInterface;
    private prevSize: oct.wrap.OctWrapInterface;
    private favText: oct.wrap.OctWrapInterface;
    private watText: oct.wrap.OctWrapInterface;

    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("ModalComponentInterface");
      super(app);
    }

    public init(): void
    {
      var tTab: Tab.TabInterface, o: oct.wrap.OctWrapFactory, h: oct.fah.util.help.HTML;
      super.init();

      h = this.app.getHTMLHelper();
      o = this.app.getOctWrapFactory();

      this.status   = o.wrapNew("<span>");
      this.tabSet   = new Tab.TabSet(this.app);
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


      tTab = new Tab.Tab(this.app, "Basic");
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

      tTab = new Tab.Tab(this.app, "Messages");
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
