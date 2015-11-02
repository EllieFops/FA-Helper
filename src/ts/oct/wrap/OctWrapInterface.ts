///<reference path="../_.ts"/>
///<reference path="OctWrapElementSetInterface.ts"/>

namespace oct.wrap
{
  export interface OctWrapInterface
  {
    addClass(c: string): OctWrapInterface;

    addClasses(c: string[]): OctWrapInterface;

    append(c: OctWrap|OctWrap[]|Node|Node[]): OctWrapInterface;

    appendTo(p: string|OctWrapInterface|Node): OctWrapInterface;

    change(f: Function): OctWrapInterface;

    children(s?: string): OctWrapElementSetInterface;

    click(e: Function): OctWrapInterface;

    doClick(): OctWrapInterface;

    dropClass(c: string): OctWrapInterface;

    dropClasses(c: string[]): OctWrapInterface;

    find(s: string): OctWrapElementSetInterface;

    getAfter(): OctWrapInterface;

    getAttribute(k: string): string;

    getBefore(): OctWrapInterface;

    getElement(): HTMLElement;

    getHTML(): string;

    getParent(): OctWrapInterface;

    getValue(): string;

    input(e: Function): OctWrapInterface;

    matches(s: string, r?: Element): boolean;

    setAfter(e: OctWrapInterface|HTMLElement): OctWrapInterface;

    setAttribute(k: string, v: string): OctWrapInterface;

    setBefore(e: OctWrapInterface|Node): OctWrapInterface;

    setHTML(x: string): OctWrapInterface;

    setParent(q: string): OctWrapInterface;

    setValue(v: string): OctWrapInterface;

    style(s: {[name: string]: string; }): OctWrapInterface;
  }
}
