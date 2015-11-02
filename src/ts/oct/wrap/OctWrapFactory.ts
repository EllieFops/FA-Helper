///<reference path="../_.ts"/>
///<reference path="OctWrap.ts"/>

namespace oct.wrap
{
  export class OctWrapFactory
  {
    constructor()
    {}

    public wrapNode(element: Node): OctWrap
    {
      return new OctWrap(element);
    }

    public wrap(element: Node|OctWrap|string): OctWrap
    {
      if (element instanceof Node) {
        return this.wrapNode(element);
      }
      if (element instanceof OctWrap) {
        return element;
      }
      if (typeof element === "string") {
        if (element.substr(0, 1) === "<" && element.slice(-1) === ">") {
          return this.wrapNew(element);
        }
        return this.wrapSelector(element);
      }
      return null;
    }

    public wrapSelector(element: string): OctWrap
    {
      var e: Node = document.querySelector(element);
      if (e) {
        return new OctWrap(e);
      }
      return null;
    }

    public wrapNew(element: string): OctWrap
    {
      var ret: OctWrap, regex: RegExp, orig: string[], filtered: string[], charVal: RegExp, index: number,
          tAttr: string, tVal: string, tEquals: number;

      charVal = /^[a-zA-Z]$/;
      regex   = new RegExp(
        "<([-\\w]+)|((?:\\.|#)[-\\w]+)|([-\\w]+\\s*=\\s*(\\\"|')" +
          "(?:\\+\\4|[^\\4])*?\\4)|([-\\w]+\\s*=\\s*[-\\w]+)|(>[^<]+<)|(\s[-\\w]+\\s)",
        "g"
      );

      orig = element.split(regex);

      filtered = [];

      // Filter Empty entries
      for (index = 0; index < orig.length; index++) {
        if (typeof orig[index] !== "undefined" && (orig[index].length > 1 || charVal.test(orig[index]))) {
          filtered.push(orig[index]);
        }
      }

      ret = new OctWrap(document.createElement(filtered.shift()));

      for (index = 0; index < filtered.length; index++) {

        // Selector Notation Class
        if (filtered[index].indexOf(".") === 0) {
          ret.addClass(filtered[index].substr(1));
          continue;
        }

        // Selector Notation ID
        if (filtered[index].indexOf("#") === 0) {
          ret.setAttribute("id", filtered[index].substr(1));
          continue;
        }

        // Skip End
        if (filtered[index].indexOf("/") === 0) {
          continue;
        }

        // Node inner text
        if (filtered[index].indexOf(">") === 0) {
          ret.setHTML(filtered[index].slice(1, -1));
          continue;
        }

        // Attribute: Value
        tEquals = filtered[index].indexOf("=");
        if (tEquals !== -1) {
          tAttr = filtered[index].substring(0, tEquals).trim();
          tVal  = filtered[index].substring(tEquals + 1).trim();

          if (tVal.indexOf("'") === 0 || tVal.indexOf("\"") === 0) {
            tVal = tVal.slice(1, -1);
          }

          // Filter empty sets
          if (tAttr.length > 0) {
            if (tAttr === "class") {
              ret.addClass(tVal);
            } else {
              ret.setAttribute(tAttr, tVal);
            }
          }
          continue;
        }

        filtered[index] = filtered[index].trim();
        // Solo Attribute
        ret.setAttribute(filtered[index], filtered[index]);
      }

      return ret;
    }
  }
}
