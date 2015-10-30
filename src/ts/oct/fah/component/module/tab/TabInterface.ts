///<reference path="../_.ts"/>
///<reference path="..\..\UIComponentInterface.ts"/>
///<reference path="TabSetInterface.ts"/>

namespace oct.fah.component.module.tab
{
  export interface TabInterface extends UIComponentInterface
  {
    getTitle(): string;

    hasPreviousSibling(): boolean;
    getPreviousSibling(): TabInterface;
    setPreviousSibling(tab: TabInterface, con: OctObject): void;

    hasNextSibling(): boolean;
    getNextSibling(): TabInterface;
    setNextSibling(tab: TabInterface, con: OctObject): void;

    getParent(): TabSetInterface;
  }
}
