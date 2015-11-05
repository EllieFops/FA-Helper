///<reference path="../_.ts"/>

namespace oct.fah.app.boot
{
  export class CSSInjector
  {
    private static cssText: string = '@@cssText';

    public static injectCSS(): void
    {
      var s: HTMLStyleElement = document.createElement("style");
      s.type                  = "text/css";
      s.innerHTML             = this.cssText;

      document.querySelector("head").appendChild(s);
    }
  }
}
