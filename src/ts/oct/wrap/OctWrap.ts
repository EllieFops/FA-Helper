///<reference path="../_.ts"/>
///<reference path="OctWrapInterface.ts"/>
///<reference path="OctWrapElementSetInterface.ts"/>

namespace oct.wrap
{
  export class OctWrap implements OctWrapInterface
  {
    private htmlElement: HTMLElement;

    public constructor(element: Node)
    {
      this.htmlElement = <HTMLElement> element;
    }

    public dropClasses(c: string[]): OctWrap
    {
      var list: DOMTokenList, index: number;

      list = this.htmlElement.classList;

      for (index = 0; index < c.length; index++) {
        list.remove(c[index]);
      }
      return this;
    }

    public addClasses(c: string[]): OctWrap
    {
      var list: DOMTokenList, index: number;

      list = this.htmlElement.classList;

      for (index = 0; index < c.length; index++) {
        list.add(c[index]);
      }

      return this;
    }

    public addClass(c: string): OctWrap
    {
      this.htmlElement.classList.add(c);
      return this;
    }

    public getAfter(): OctWrap
    {
      var a: Node = this.htmlElement.nextSibling;

      return (a)
        ? new OctWrap(a)
        : null;
    }

    public setAfter(e: OctWrap|HTMLElement): OctWrap
    {
      var a: Node = this.getElement().nextSibling;

      if (!a) {
        if (e instanceof OctWrap) {
          this.getElement().parentElement.appendChild(e.getElement());
        } else if (e instanceof Node) {
          this.getElement().parentElement.appendChild(e);
        }
      } else if (a instanceof Node) {
        if (e instanceof OctWrap) {
          this.getElement().parentElement.insertBefore(e.getElement(), a);
        } else if (e instanceof Node) {
          this.getElement().parentElement.insertBefore(e, a);
        }
      }

      return this;
    }

    public append(c: OctWrapInterface[]|OctWrapInterface|Node[]|Node): OctWrap
    {
      var i: number;

      if (c instanceof Array) {
        for (i = 0; i < c.length; i++) {
          if (c[i] instanceof OctWrap) {
            this.getElement().appendChild((<OctWrap> c[i]).getElement());
          } else if (c[i] instanceof Node) {
            this.append(c[i]);
          }
        }
      } else {
        if (c instanceof OctWrap) {
          this.getElement().appendChild(c.getElement());
        } else if (c instanceof Node) {
          this.getElement().appendChild(c);
        }
      }
      return this;
    }

    public appendTo(p: string|OctWrap|Node): OctWrap
    {
      var e: Node;
      if (typeof p === "string") {
        e = document.querySelector(p);
        if (e) {
          e.appendChild(this.getElement());
        }
      } else if (p instanceof Node) {
        new OctWrap(p).append(this);
      } else if (p instanceof OctWrap) {
        p.append(this);
      }

      return this;
    }

    public getAttribute(k: string): string
    {
      return this.getElement().getAttribute(k);
    }

    public setAttribute(k: string|{}, v?: string): OctWrap
    {
      var i: string;
      if (typeof k === "string") {
        this.getElement().setAttribute(k, v);
      }
      if (k instanceof Object) {
        for (i in k) {
          if (!k.hasOwnProperty(i)) {
            continue;
          }
          this.getElement().setAttribute(i, k[i]);
        }
      }
      return this;
    }

    public getBefore(): OctWrap
    {
      var a: Node = this.getElement().previousSibling;
      return (a) ? new OctWrap(a) : null;
    }

    public setBefore(e?: OctWrap|Node): OctWrap
    {
      if (e instanceof OctWrap) {
        this.getElement().parentElement.insertBefore(e.getElement(), this.getElement());
      } else if (e instanceof Node) {
        this.getElement().parentElement.insertBefore(e, this.getElement());
      }
      return this;
    }

    public change(f: Function): OctWrap
    {
      this.getElement().addEventListener("change", <EventListener> f);
      return this;
    }

    public children(s?: string): OctWrapElementSetInterface
    {
      var l: NodeList;

      if (!this.getElement().hasChildNodes()) {
        return null;
      }

      if (typeof s === "string") {
        l = this.getElement().querySelectorAll(s);
      } else {
        l = this.getElement().children;
      }

      return new OctWrapElementSet(l);
    }

    public doClick(): OctWrap
    {
      this.getElement().click();
      return this;
    }

    public click(e: Function): OctWrap
    {
      this.getElement().addEventListener("click", <EventListener> e);
      return this;
    }

    public dropClass(c: string|string[]): OctWrap
    {
      var list: DOMTokenList, index: number;

      list = this.getElement().classList;

      if (c instanceof Array) {
        for (index = 0; index < c.length; index++) {
          if (list.contains(c[index])) {
            list.remove(c[index]);
          }
        }
      } else if (typeof c === "string") {
        if (list.contains(c)) {
          list.remove(c);
        }
      }

      return this;
    }

    public find(s: string): OctWrapElementSetInterface
    {
      return new OctWrapElementSet(this.getElement().querySelectorAll(s));
    }

    public getElement(): HTMLElement
    {
      return this.htmlElement;
    }

    public getHTML(): string
    {
      return this.getElement().innerHTML
    }

    public setHTML(x: string): OctWrap
    {
      this.getElement().innerHTML = x;
      return this;
    }

    public input(e: Function): OctWrap
    {
      this.getElement().addEventListener("input", <EventListener> e);
      return this;
    }

    public matches(s: string, r?: Element): boolean
    {
      var mat: string, web: string, moz: string;

      if (typeof r === "undefined") {
        r = this.getElement();
      }

      mat = "matches";
      if (r[mat] === "function") {
        return r[mat](s);
      }

      web = "webkitMatchesSelector";
      if (typeof r[web] === "function") {
        return r[web](s);
      }

      moz = "mozMatchesSelector";
      if (typeof r[moz] === "function") {
        return r[moz](s);
      }

      if (typeof r.msMatchesSelector === "function") {
        return r.msMatchesSelector(s);
      }

      return false;
    }

    public getParent(): oct.wrap.OctWrapInterface
    {
      return new OctWrap(this.getElement().parentNode);
    }

    public setParent(q: string): OctWrap
    {
      var parent: Node, i: number;

      parent = this.getElement().parentNode;

      for (i = 0; i < 300; i++) {
        if (this.matches(q, <Element> parent)) {
          return new OctWrap(parent);
        }

        parent = parent.parentNode;
      }

      return null;
    }

    public style(s: {[name: string]: string; }): OctWrap
    {
      var i: string, c: Object;

      c = this.getElement().style;

      for (i in s) {
        if (!s.hasOwnProperty(i)) {
          continue;
        }

        if (typeof c[i] !== "undefined") {
          c[i] = s[i];
        }
      }

      return this;
    }

    public getValue(): string
    {
      return (<HTMLInputElement> this.getElement()).value;
    }

    public setValue(v: string): OctWrap
    {
      (<HTMLInputElement> this.getElement()).value = v;
      return this;
    }
  }

  class OctWrapElementSet implements OctWrapElementSetInterface
  {

    private collection: Array<HTMLElement>;
    private pointer: number;

    public constructor(a: NodeList)
    {
      var i: number;
      if (a instanceof NodeList) {
        this.collection = new Array<HTMLElement>(a.length);
        for (i = 0; i < a.length; i++) {
          this.collection[i] = <HTMLElement> ((<NodeList> a).item(i));
        }
      }
      this.pointer = 0;
    }

    public hasNext(): boolean
    {
      return (this.collection.length > this.pointer + 1);
    }

    public next(): OctWrap
    {
      return new OctWrap(this.nextRaw());
    }

    public nextRaw(): HTMLElement
    {
      this.pointer++;
      return this.collection[this.pointer - 1];
    }

    public first(): OctWrap
    {
      this.pointer = 0;
      return this.next();
    }

    public firstRaw(): HTMLElement
    {
      this.pointer = 0;
      return this.nextRaw();
    }

    public last(): OctWrap
    {
      this.pointer = this.collection.length - 1;
      return this.next();
    }

    public lastRaw(): HTMLElement
    {
      this.pointer = this.collection.length - 1;
      return this.nextRaw();
    }
  }
}
