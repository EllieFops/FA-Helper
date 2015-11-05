///<reference path="_.ts"/>
///<reference path="..\..\OctObject.ts"/>
///<reference path="..\util\StorageManagerInterface.ts"/>

namespace oct.fah.app
{
  const SETTINGS = "octFAHSettings";

  export class SettingsManager extends OctObject
  {

    private settings: { [key: string]: any; };
    private storage: oct.fah.util.StorageManagerInterface;
    private def: { [key: string]: any; };

    constructor(storage: oct.fah.util.StorageManagerInterface)
    {
      this.storage = storage;
      this.def = {
        "showHoverPreviews": true,
        "hoverPreviewSize":  400,
        "newWatcherShout": "",
        "newFavoriteShout": ""
      };
      super();
    }

    public init(): void
    {
      this.settings = this.storage.getValue(SETTINGS, this.def);
    }

    public getSetting(key: string, def?: Object): Object
    {
      if (typeof this.settings[key] === "undefined") {
        return def || null;
      }

      return this.settings[key];
    }

    public putSetting(key: string, val: Object): void
    {
      this.settings[key] = val;
      this.storage.putValue(SETTINGS, this.settings);
    }

    private update(): void
    {
      var key: string, didUpdate: boolean;

      didUpdate = false;

      for (key in this.def) {
        if (!this.def.hasOwnProperty(key)) {
          continue;
        }

        if (typeof this.settings[key] === "undefined") {
          this.settings[key] = this.def[key];
          didUpdate = true;
        }
      }

      if (didUpdate) {
        this.storage.putValue(SETTINGS, this.settings);
      }
    }
  }
}
