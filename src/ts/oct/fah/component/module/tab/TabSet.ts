///<reference path="../_.ts"/>
///<reference path="..\..\UIComponent.ts"/>
///<reference path="TabSetInterface.ts"/>
///<reference path="TabInterface.ts"/>
///<reference path="..\..\..\..\wrap\OctWrap.ts"/>

namespace oct.fah.component.module.tab
{
  export class TabSet extends UIComponent implements TabSetInterface
  {
    protected firstChild: TabInterface;
    protected lastChild: TabInterface;
    protected children: Array<TabInterface>;
    protected selected: TabInterface;
    protected tabHeaders: Array<wrap.OctWrap>;
    protected headerBlock: wrap.OctWrap;
    protected body: HTMLDivElement;

    constructor(app: App, element: HTMLElement)
    {
      this.implementationOf("TabSetInterface");
      super(app, element);
    }

    public init(): void
    {
      this.headerBlock = this.app.getOctWrapFactory().wrapNew("<ul>").style({listStyle: CSS.NONE, padding: "0"});
    }

    public getTabs(): Array<TabInterface>
    {
      return undefined;
    }

    public getTab(i: number): TabInterface
    {
      return undefined;
    }

    public getSelectedTab(): TabInterface
    {
      return undefined;
    }

    public getSelectedTabIndex(): number
    {
      return undefined;
    }

    public selectTab(i: TabInterface|number): void
    {
      if (typeof i === "number") {
        this.deSelectStyle(this.selected);
        this.selected = this.children[i];
        this.selectStyle(i);
      }
    }

    public appendTab(t: TabInterface): void
    {
      this.lastChild.setNextSibling(t, this);
      this.children.push(t);
      this.tabHeaders.push(this.makeHeader(t.getTitle()));
      this.lastChild = t;
    }

    public prependTab(t: TabInterface): void
    {
      this.firstChild.setPreviousSibling(t, this);
      this.children   = [t].concat(this.children);
      this.tabHeaders = [this.makeHeader(t.getTitle())].concat(this.tabHeaders);
      this.firstChild = t;
    }

    public insertTab(t: TabInterface, i: number): void
    {
      var nPrev: TabInterface, nNext: TabInterface;

      if (i === 0) {
        this.prependTab(t);
        return;
      }

      if (i >= this.children.length) {
        this.appendTab(t);
        return;
      }

      nPrev = this.children[i - 1];
      nNext = this.children[i];

      t.setPreviousSibling(nPrev, this);
      t.setNextSibling(nNext, this);
      this.children.push(t);
      this.tabHeaders.push(this.makeHeader(t.getTitle()));
      this.sortTabs();
    }

    protected deSelectStyle(tab: TabInterface): void
    {
      this.app.getOctWrapFactory()
        .wrapNode(tab.getElement())
        .style({display: CSSDisplay.NONE});
    }

    protected selectStyle(ind: number): void
    {
      var a: HTMLElement, b: wrap.OctWrap;
      a = this.children[ind].getElement();
      b = this.headerBlock[ind];

      this.app.getOctWrapFactory().wrapNode(a).style({display: CSSDisplay.BLOCK});
      // TODO stopped here for some reason
    }

    public sortTabs(): void
    {
      var
        nChil: Array<TabInterface>,
        nHead: Array<wrap.OctWrap>,
        index: number,
        curChild: TabInterface,
        tKey: number,
        tHead: HTMLElement;

      nChil    = new Array<TabInterface>(this.children.length);
      nHead    = new Array<wrap.OctWrap>(this.tabHeaders.length);
      index    = 0;
      curChild = this.firstChild;
      tHead    = this.headerBlock.getElement();

      while (curChild.hasNextSibling()) {
        tKey         = this.children.indexOf(curChild);
        nChil[index] = curChild;
        nHead[index] = this.tabHeaders[tKey];
        index++;
        curChild     = curChild.getNextSibling();
      }

      // Sort LI elements in UL
      while (tHead.firstChild) {
        tHead.removeChild(tHead.firstChild);
      }
      for (index = 0; index < nHead.length; index++) {
        tHead.appendChild(nHead[index].getElement());
      }

      this.children   = nChil;
      this.tabHeaders = nHead;
    }

    private makeHeader(title: string): wrap.OctWrap
    {
      return this.app.getOctWrapFactory().wrapNew("<li>").html(title).addClass(["octTab", "deselected"]);
    }
  }
}
