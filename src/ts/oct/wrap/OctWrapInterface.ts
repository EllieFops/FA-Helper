///<reference path="../_.ts"/>
///<reference path="OctWrapElementSetInterface.ts"/>

namespace oct.wrap
{
  export interface OctWrapInterface
  {
    addClass(c: string[]): OctWrapInterface;
    addClass(c: string): OctWrapInterface;
    addClass(c: string[]|string): OctWrapInterface;

    after(): OctWrapInterface;
    after(e: OctWrapInterface): OctWrapInterface;
    after(e: HTMLElement): OctWrapInterface;
    after(e?: OctWrapInterface|HTMLElement): OctWrapInterface;

    append(c: OctWrap[]): OctWrapInterface;
    append(c: OctWrapInterface): OctWrapInterface;
    append(c: Node[]): OctWrapInterface;
    append(c: Node): OctWrapInterface;
    append(c: OctWrap|OctWrap[]|Node|Node[]): OctWrapInterface;

    appendTo(p: string): OctWrapInterface;
    appendTo(p: OctWrapInterface): OctWrapInterface;
    appendTo(p: Node): OctWrapInterface;
    appendTo(p: string|OctWrapInterface|Node): OctWrapInterface;

    before(): OctWrapInterface;
    before(e: OctWrapInterface): OctWrapInterface;
    before(e: Node): OctWrapInterface;
    before(e?: OctWrapInterface|Node): OctWrapInterface;

    click(): OctWrapInterface;
    click(e: Function): OctWrapInterface;
    click(e?: Function): OctWrapInterface;

    dropClass(c: string): OctWrapInterface;
    dropClass(c: string[]): OctWrapInterface;
    dropClass(c: string|string[]): OctWrapInterface;

    find(s: string): OctWrapElementSetInterface;

    html(): string;
    html(x: string): OctWrapInterface;
    html(x?: string): string|OctWrapInterface;

    input(e: Function): OctWrapInterface;

    matches(s: string): boolean;
    matches(s: string, r: Element): boolean;
    matches(s: string, r?: Element): boolean;

    parent(): OctWrapInterface;
    parent(q: string): OctWrapInterface;
    parent(q?: string): OctWrapInterface;

    style(s: {[name: string]: string; }): OctWrapInterface;

    value(): string;
    value(v: string): OctWrapInterface;
    value(v?: string): string|OctWrapInterface;

    getElement(): HTMLElement;
  }
}
