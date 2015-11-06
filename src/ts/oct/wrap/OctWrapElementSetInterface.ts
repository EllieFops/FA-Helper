namespace oct.wrap
{
  export interface OctWrapElementSetInterface
  {
    hasNext(): boolean;

    next(): OctWrap;

    nextRaw(): HTMLElement;

    first(): OctWrap;

    firstRaw(): HTMLElement;

    last(): OctWrap;

    lastRaw(): HTMLElement;

    size(): number;
  }
}
