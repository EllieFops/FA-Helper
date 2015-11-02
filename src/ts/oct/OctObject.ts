///<reference path="_.ts"/>
///<reference path="OctObjectInterface.ts"/>

namespace oct
{
  export class OctObject implements OctObjectInterface
  {
    private interfaces: { [name: string]: boolean; };

    constructor()
    {
      this.create();
    }

    public isImplementationOf(name: string): boolean
    {
      return this.interfaces[name] || false;
    }

    protected implementationOf(name: string): void
    {
      if (!this.interfaces) {this.create();}
      this.interfaces[name] = true;
    }

    private create()
    {
      this.interfaces = {"OctObjectInterface": true};
    }
  }
}
