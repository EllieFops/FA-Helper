///<reference path="_.ts"/>

namespace oct.fah.util
{
  export class Util extends OctObject
  {

    constructor()
    {
      super();
    }

    public makeGUID(): string
    {
      var delim: string = "-";

      function S4(): string
      {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }
  }
}
