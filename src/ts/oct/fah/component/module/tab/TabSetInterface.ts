///<reference path="../_.ts"/>
///<reference path="..\..\UIComponentInterface.ts"/>
///<reference path="TabInterface.ts"/>

namespace oct.fah.component.module.tab
{
  export interface TabSetInterface extends UIComponentInterface
  {
    getTabs(): Array<TabInterface>;

    getTab(i: number): TabInterface;

    getSelectedTab(): TabInterface;

    getSelectedTabIndex(): number;

    selectTab(i: TabInterface): void;
    selectTab(i: number): void;

    appendTab(t: TabInterface): void;

    prependTab(t: TabInterface): void;

    insertTab(t: TabInterface, i: number): void;

    sortTabs(): void;
  }
}
