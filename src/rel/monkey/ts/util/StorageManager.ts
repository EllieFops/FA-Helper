namespace oct.fah.util
{
  export class StorageManager implements StorageManagerInterface
  {

    getValue(key: string, defVal: any): any
    {
      return GM_getValue(key, defVal);
    }

    putValue(key: string, value: any): void
    {
      GM_setValue(key, value);
    }
  }
}