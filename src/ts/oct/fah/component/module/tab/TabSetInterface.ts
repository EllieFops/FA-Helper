///<reference path="../_.ts"/>
///<reference path="..\..\UIComponentInterface.ts"/>
///<reference path="TabInterface.ts"/>
///<reference path="TabSet.ts"/>

namespace oct.fah.component.module.tab
{
  import OctWrapInterface = oct.wrap.OctWrapInterface;

  export interface TabSetInterface extends UIComponentInterface
  {
    getTabs(): Array<TabInterface>;

    getTab(i: number): TabInterface;

    getSelectedTab(): TabInterface;

    getSelectedTabIndex(): number;

    selectTab(guid: string): void;

    appendTab(t: TabInterface): void;

    prependTab(t: TabInterface): void;

    insertTab(t: TabInterface, i: number): void;

    removeTab(guid: string): void;

    sortTabs(): void;

    createTab(title: string): TabInterface;

    getTabRow(): OctWrapInterface;
  }
}
