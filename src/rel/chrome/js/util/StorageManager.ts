namespace oct.fah.util
{
  export class StorageManager implements StorageManagerInterface
  {

    getValue(key: string, defVal: any): any
    {
      return chrome.storage.get(key) || defVal;
    }

    putValue(key: string, value: any): void
    {
      var object  = {};
      object[key] = value;
      chrome.storage.sync.set(object);
    }
  }
}