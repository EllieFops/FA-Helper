///<reference path="../_.ts"/>
///<reference path="..\..\UIComponentInterface.ts"/>
///<reference path="TabSetInterface.ts"/>

namespace oct.fah.component.module.tab
{
  export interface TabInterface extends UIComponentInterface
  {
    getTitle(): string;

    getParent(): TabSetInterface;

    getHeader(): oct.wrap.OctWrapInterface;

    getTabId(): string;
  }
}
