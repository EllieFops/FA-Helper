///<reference path="../_.ts"/>

namespace oct.fah.util.help
{
  export class StringUtils
  {
    public trim(s: string[], c?: string): string[];
    public trim(s: string, c?: string): string;
    public trim(s: string|string[], c?: string): string|string[]
    {
      return this.trimRight(this.trimLeft(s, c), c);
    }

    public trimLeft(s: string[], c?: string): string[];
    public trimLeft(s: string, c?: string): string;
    public trimLeft(s: string|string[], c?: string): string|string[]
    {
      var r: RegExp, i: number;

      c = (typeof c !== "string") ? " " : c;
      r = new RegExp("^[" + c + "]");

      if (s instanceof Array) {
        for (i = 0; i < s.length; i++) {
          s[i] = s[i].replace(r, "");
        }
        return s;
      }

      return s.replace(r, "");
    }

    public trimRight(s: Array<string>, c?: string): Array<string>;
    public trimRight(s: string, c?: string): string;
    public trimRight(s: string|string[], c?: string): string|string[]
    {
      var r: RegExp, i: number;

      c = (typeof c !== "string") ? " " : c;
      r = new RegExp("[" + c + "]$");

      if (s instanceof Array) {
        for (i = 0; i < s.length; i++) {
          s[i] = s[i].replace(r, "");
        }
        return s;
      }

      return s.replace(r, "");
    }
  }
}
