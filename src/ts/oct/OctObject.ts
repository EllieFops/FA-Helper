///<reference path="_.ts"/>
///<reference path="OctObjectInterface.ts"/>

namespace oct
{
  export class OctObject implements OctObjectInterface
  {
    private interfaces: { [name: string]: boolean; } = {"OctObjectInterface": true};

    public isImplementationOf(name: string): boolean
    {
      return this.interfaces[name] || false;
    }

    protected implementationOf(name: string): void
    {
      this.interfaces[name] = true;
    }
  }
}
