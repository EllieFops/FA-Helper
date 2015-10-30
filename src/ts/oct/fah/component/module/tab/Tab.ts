///<reference path="../_.ts"/>
///<reference path="TabInterface.ts"/>
///<reference path="..\..\UIComponent.ts"/>
///<reference path="TabSetInterface.ts"/>
///<reference path="..\..\..\app\App.ts"/>

namespace oct.fah.component.module.tab
{
  export class Tab extends UIComponent implements TabInterface
  {
    protected title: string;
    protected previous: TabInterface;
    protected next: TabInterface;
    protected parent: TabSetInterface;

    constructor(app: oct.fah.app.App)
    {
      super(app, document.createElement("div"));
    }

    public getTitle(): string
    {
      return this.title;
    }

    public hasPreviousSibling(): boolean
    {
      return (typeof this.previous !== "undefined" && this.previous);
    }

    public getPreviousSibling(): TabInterface
    {
      return this.previous;
    }

    public setPreviousSibling(tab: TabInterface, con: OctObject): void
    {
      this.previous = tab;
      tab.setNextSibling(this, con);

      // If the call is not coming from the parent, call the parent sort manually.
      if (con !== (<OctObject> this.parent) && typeof this.parent !== "undefined") {
        this.parent.sortTabs();
      }
    }

    public hasNextSibling(): boolean
    {
      return (typeof this.next !== "undefined" && this.next);
    }

    public getNextSibling(): TabInterface
    {
      return this.next;
    }

    public setNextSibling(tab: TabInterface, con: OctObject): void
    {
      this.previous = tab;

      // If the call is not coming from the parent, call the parent sort manually.
      if (con !== (<OctObject> this.parent) && typeof this.parent !== "undefined") {
        this.parent.sortTabs();
      }
    }

    public getParent(): TabSetInterface
    {
      return null;
    }

    public setParent(ts: TabSetInterface): void
    {
      this.parent = ts;
    }
  }
}
