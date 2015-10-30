///<reference path="../_.ts"/>
///<reference path="..\..\app\App.ts"/>
///<reference path="..\..\..\wrap\OctWrap.ts"/>

namespace oct.fah.util.dom
{
  export class PageParser
  {
    private app: oct.fah.app.App;

    constructor(app: oct.fah.app.App)
    {
      this.app = app;
    }

    public runParser(doc: HTMLDocument, input: {[name: string]: Function; }): {[name: string]: Object; }
    {
      var dom: wrap.OctWrap <HTMLDocument>, out: {[name: string]: Object; }, temp: string;

      dom = this.app.getOctWrapFactory().wrapNode(doc);

      for (temp in input) {
        if (!input.hasOwnProperty(temp)) {
          continue;
        }

        out[temp] = input[temp](dom);
      }

      return out;
    }
  }
}
