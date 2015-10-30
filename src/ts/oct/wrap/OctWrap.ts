///<reference path="../_.ts"/>
///<reference path="OctWrapInterface.ts"/>
///<reference path="OctWrapElementSetInterface.ts"/>

namespace oct.wrap
{
  export class OctWrap implements OctWrapInterface
  {
    public private
           htmlElement: HTMLElement;

    public constructor(element: Node)
    {
      this.htmlElement = <HTMLElement> element;
    }

    public addClass(c: Array<string>): OctWrap;
    public addClass(c: string): OctWrap;
    public addClass(c: Array<string>|string): OctWrap
    {
      var list: DOMTokenList, index: number;

      list = this.htmlElement.classList;

      if (c instanceof Array) {
        for (index = 0; index < c.length; index++) {
          list.add(c[index]);
        }
      } else {
        list.add(c);
      }

      return this;
    }

    public after(): OctWrap;
    public after(e: OctWrap): OctWrap;
    public after(e: HTMLElement): OctWrap;
    public after(e?: OctWrap|HTMLElement): OctWrap
    {
      var a: Node = this.htmlElement.nextSibling;

      if (!e) {
        return (a)
          ? new OctWrap(a)
          : null;
      }

      if (!a) {
        this.htmlElement.parentElement.appendChild(
          (e instanceof OctWrap) ? e.htmlElement : e
        );
      } else {
        this.htmlElement.parentElement.insertBefore(e, a);
      }

      return this;
    }

    public append(c: Array<OctWrap>): OctWrap;
    public append(c: OctWrap): OctWrap;
    public append(c: Array<Node>): OctWrap;
    public append(c: Node): OctWrap;
    public append(c: Array<OctWrap>|OctWrap|Array<Node>|Node): OctWrap
    {
      var i: number;

      if (c instanceof Array) {
        for (i = 0; i < c.length; i++) {
          this.append(c[i]);
        }
      } else {
        if (c instanceof OctWrap) {
          this.htmlElement.appendChild(c.getElement());
        } else {
          this.htmlElement.appendChild(c);
        }
      }
      return this;
    }

    public appendTo(p: string): OctWrap;
    public appendTo(p: OctWrap): OctWrap;
    public appendTo(p: Node): OctWrap;
    public appendTo(p: string|OctWrap|Node): OctWrap
    {
      var e: Node;
      if (typeof p === "string") {
        e = document.querySelector(p);
        if (e) {
          e.appendChild(this.htmlElement);
        }
      } else {
        // Done this way to catch both Elements and HTML instances
        new OctWrap(p).append(this);
      }

      return this;
    }

    public attribute(k: string): string;
    public attribute(k: {}): OctWrap;
    public attribute(k: string, v: string): OctWrap;
    public attribute(k: string|{}, v?: string): string|OctWrap
    {
      var i: string;
      if (typeof k === "string") {
        if (!v) {
          return this.htmlElement.getAttribute(k);
        }
        this.htmlElement.setAttribute(k, v);
      }
      if (k instanceof Object) {
        for (i in k) {
          if (!k.hasOwnProperty(i)) {
            continue;
          }
          this.htmlElement.setAttribute(i, k[i]);
        }
      }
      return this;
    }

    public before(): OctWrap;
    public before(e: OctWrap): OctWrap;
    public before(e: Node): OctWrap;
    public before(e?: OctWrap|Node): OctWrap
    {
      var a: Node = this.htmlElement.previousSibling;

      if (!e) {
        return (a) ? new OctWrap(a) : null;
      }

      this.htmlElement.parentElement.insertBefore(e, this.htmlElement);
      return this;
    }

    public change(f: Function): OctWrap
    {
      this.htmlElement.addEventListener("change", <EventListener> f);
      return this;
    }

    public children(s?: string): OctWrapElementSetInterface
    {
      var l: NodeList;

      if (!this.htmlElement.hasChildNodes()) {
        return null;
      }

      if (typeof s === "string") {
        l = this.htmlElement.querySelectorAll(s);
      } else {
        l = this.htmlElement.children;
      }

      return new OctWrapElementSet(l);
    }

    public click(): OctWrap;
    public click(e: Function): OctWrap;
    public click(e?: OctWrap|Function): OctWrap
    {
      if (e) {
        this.htmlElement.addEventListener("click", <EventListener> e);
      } else {
        this.htmlElement.click();
      }
      return this;
    }

    public dropClass(c: string): OctWrap;
    public dropClass(c: string[]): OctWrap;
    public dropClass(c: string|string[]): OctWrap
    {
      var list: DOMTokenList, index: number;

      list = this.htmlElement.classList;

      if (c instanceof Array) {
        for (index = 0; index < c.length; index++) {
          if (list.contains(c)) {
            list.remove(c);
          }
        }
      } else {
        if (list.contains(c)) {
          list.remove(c);
        }
      }

      return this;
    }

    public find(s: string): OctWrapElementSetInterface
    {
      return new OctWrapElementSet(this.htmlElement.querySelectorAll(s));
    }

    public getElement(): HTMLElement
    {
      return this.htmlElement;
    }

    public html(): string;
    public html(x: string): OctWrap;
    public html(x?: string): string|OctWrap
    {
      if (!x) {
        return this.htmlElement.innerHTML;
      }
      this.htmlElement.innerHTML = x;
      return this;
    }

    public input(e: Function): OctWrap
    {
      this.htmlElement.addEventListener("input", <EventListener> e);
      return this;
    }

    public matches(s: string): boolean;
    public matches(s: string, r: Element): boolean;
    public matches(s: string, r?: Element): boolean
    {
      var mat: string, web: string, moz: string;

      if (typeof r === "undefined") {
        r = this.htmlElement;
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

    public parent(): OctWrap;
    public parent(q: string): OctWrap;
    public parent(q?: string): OctWrap
    {
      var parent: Node, i: number;

      if (!q) {
        return new OctWrap(this.htmlElement.parentNode);
      }

      parent = this.htmlElement.parentNode;

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

      c = this.htmlElement.style;

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

    public value(): string;
    public value(v: string): OctWrap;
    public value(v?: string): string|OctWrap
    {
      if (!v) {
        return (<HTMLInputElement> this.htmlElement).value;
      }

      (<HTMLInputElement> this.htmlElement).value = v;
      return this;
    }
  }

  class OctWrapElementSet implements OctWrapElementSetInterface
  {

    public private
           collection: Array<HTMLElement>;
    public private
           pointer: number;

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
