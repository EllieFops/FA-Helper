///<reference path="..\chrome.d.ts"/>

namespace oct.fah.util
{
  export class StorageManager implements StorageManagerInterface
  {

    getValue(key: string, defVal: any): any
    {
      var i: number, waiting: boolean, vals: {};

      waiting = true;
      i       = 0;

      chrome.storage.sync.get(
        key,
        function (items: {}): void
        {
          vals = items;
          waiting = false;
        }
      );

      while (waiting || i < 1000) {
        i++;
      }

      return (typeof vals === "undefined") ? defVal : vals;
    }

    putValue(key: string, value: any): void
    {
      var object = {};
      object[key] = value;
      chrome.storage.sync.set(object);
    }
  }
}
