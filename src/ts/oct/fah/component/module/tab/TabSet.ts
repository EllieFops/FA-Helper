///<reference path="../_.ts"/>
///<reference path="../../../app/App.ts"/>
///<reference path="../../../../wrap/OctWrapInterface.ts"/>
///<reference path="../../../../wrap/OctWrapFactory.ts"/>
///<reference path="../../UIComponent.ts"/>
///<reference path="TabSetInterface.ts"/>
///<reference path="TabInterface.ts"/>

namespace oct.fah.component.module.tab
{

  import App              = oct.fah.app.App;
  import OctWrapInterface = oct.wrap.OctWrapInterface;
  import OctWrapFactory   = oct.wrap.OctWrapFactory;

  export class TabSet extends UIComponent implements TabSetInterface
  {
    protected size: number;
    protected children: { [guid: string]: {index: number; header: OctWrapInterface; tab: TabInterface}; };
    protected selected: string;
    protected headerBlock: OctWrapInterface;
    protected body: OctWrapInterface;

    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("TabSetInterface");
      this.children = {};
      this.size     = 0;

      super(app, document.createElement("div"));
    }

    public init(): void
    {
      var o: OctWrapFactory;

      o = this.app.getOctWrapFactory();

      this.headerBlock = o.wrapNew("<ul>").addClass("octTabRow");
      this.body        = o.wrapNew("<div>");

      o.wrapNode(this.htmlElement)
        .addClass("octTab")
        .append([this.headerBlock, this.body]);
    }

    public getTabs(): Array<TabInterface>
    {
      var arr: TabInterface[], t: string;
      arr = [];

      for (t in this.children) {
        if (!this.children.hasOwnProperty(t)) {
          continue;
        }

        arr.push(this.children[t].tab);
      }

      return arr;
    }

    public getTab(i: number): TabInterface
    {
      return undefined;
    }

    public getSelectedTab(): TabInterface
    {
      return this.children[this.selected].tab;
    }

    public getSelectedTabIndex(): number
    {
      return undefined;
    }

    public selectTab(guid: string): void
    {
      if (typeof this.children[guid] === "undefined") {
        return;
      }

      this.children[guid].tab.getHeader().dropClass("deselected").addClass("selected");

      // The old selection may have been dropped from the tab set.
      if (typeof this.children[this.selected] === "undefined") {
        this.children[this.selected].tab.getHeader().dropClass("selected").addClass("deselected");
      }

      this.selected = guid;
    }

    /**
     * Append a new Tab to the last position in this TabSet
     *
     * @param t
     */
    public appendTab(t: TabInterface): void
    {
      var g: string, h: OctWrapInterface;

      g = t.getTabId();

      // If this tab is already in the collection, remove it to "append" it.
      if (typeof this.children[g] !== "undefined") {
        this.removeTab(g);
      }

      h = this.makeHeader(t.getHeader());

      this.children[g] = {index: this.size, header: h, tab: t};
      this.size++;
      this.headerBlock.append(h);
      this.htmlElement.appendChild(t.getElement());
    }

    /**
     * Prepend a new Tab to the first position in this TabSet
     *
     * @param t
     */
    public prependTab(t: TabInterface): void
    {
      this.insertTab(t, 0);
    }

    /**
     * Insert a new Tab to the given position in this TabSet
     *
     * @param t
     * @param i
     */
    public insertTab(t: TabInterface, i: number): void
    {
      var g: string, h: OctWrapInterface;

      i = Math.floor(i);
      g = t.getTabId();

      if (typeof this.children[g] !== "undefined") {
        if (this.children[g].index === i) {
          return;
        }

        this.removeTab(g);
      }

      this.bumpIndex(i);

      h = this.makeHeader(t.getHeader());

      this.children[g] = {index: i, header: h, tab: t};
      this.size++;
      this.headerBlock.append(h);
      this.htmlElement.appendChild(t.getElement());
      this.sortTabs();
    }

    /**
     * Sort the tab headers by the stored tab index.
     *
     */
    public sortTabs(): void
    {
      var a: OctWrapInterface[], t: string, i: number;

      a = new Array(this.size);
      for (t in this.children) {
        if (!this.children.hasOwnProperty(t)) {
          continue;
        }

        a[this.children[t].index] = this.children[t].header;
      }

      for (i = 0; i < this.size; i++) {
        this.headerBlock.append(a[i]);
      }
    }

    /**
     * Remove a Tab from this TabSet
     *
     * @param guid {string} ID of the Tab to remove
     */
    public removeTab(guid: string): void
    {
      var v: number;

      if (typeof this.children[guid] === "undefined") {
        return;
      }

      v = this.children[guid].index;

      delete this.children[guid];
      this.size--;
      this.repairIndices(v);

      if (this.selected === guid) {
        this.selectTab(Object.keys(this.children)[0]);
      }
    }

    public createTab(title: string) {
      return new Tab(this.app, title, this);
    }

    /**
     * Wrap the Tab header in an LI tag
     *
     * @param head OctWrapInterface
     *
     * @returns OctWrapInterface
     */
    private makeHeader(head: OctWrapInterface): OctWrapInterface
    {
      return this.app.getOctWrapFactory()
        .wrapNew("<li>")
        .append(head.addClass((this.size === 0) ? "selected" : "deselected"));
    }

    /**
     * Shift all elements with the given index or a higher index up 1 to allow
     * the insertion of a new tab at that index
     *
     * @param i {number} Index to clear.
     */
    private bumpIndex(i: number): void
    {
      var t: string;

      for (t in this.children) {
        if (!this.children.hasOwnProperty(t)) {
          continue;
        }

        if (this.children[t].index >= i) {
          this.children[t].index++;
        }
      }
    }

    /**
     * Shift all the elements higher than the given index down 1 to fill a gap
     * left by the removal of a Tab
     *
     * @param i
     */
    private repairIndices(i: number): void
    {
      var t: string;

      for (t in this.children) {
        if (!this.children.hasOwnProperty(t)) {
          continue;
        }

        if (this.children[t].index > i) {
          this.children[t].index--;
        }
      }
    }
  }

  class Tab extends UIComponent implements TabInterface
  {
    protected title:  string;
    protected parent: TabSetInterface;
    protected header: OctWrapInterface;
    protected guid:   string;

    constructor(app: App, title: string, parent: TabSetInterface)
    {
      this.implementationOf("TabInterface");
      this.title  = title;
      this.parent = parent;

      super(app, document.createElement("div"));
    }

    public init(): void
    {
      var o: OctWrapFactory;

      o = this.app.getOctWrapFactory();

      this.guid = this.app.getUtilities().makeGUID();
      this.header = o.wrapNew("<a.octTabHead>").setAttribute(TAB_ID_ATTRIBUTE, this.guid);

      o.wrapNode(this.htmlElement)
        .addClasses(["octTabBody", "octDisplayNone"])
        .setAttribute(TAB_ID_ATTRIBUTE, this.guid);
    }

    /**
     * Get this tab's title
     *
     * @returns {string}
     */
    public getTitle(): string
    {
      return this.title;
    }

    /**
     * Get Tabset Container for this tab
     *
     * @returns TabSetInterface
     */
    public getParent(): TabSetInterface
    {
      return this.parent;
    }

    /**
     * Get Tab Header
     *
     * @returns {OctWrapInterface}
     */
    public getHeader(): OctWrapInterface
    {
      return this.header;
    }

    /**
     * Get Tab GUID
     *
     * @returns {string}
     */
    public getTabId(): string
    {
      return this.guid;
    }
  }
}
