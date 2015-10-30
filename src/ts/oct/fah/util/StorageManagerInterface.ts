///<reference path="../_.ts"/>

namespace oct.fah.util
{
  export interface StorageManagerInterface
  {
    getValue(key: string, defVal: Object): Object;
    putValue(key: string, value: Object): void;
  }
}
