///<reference path="_.ts"/>
///<reference path="..\..\OctObject.ts"/>

namespace oct.fah.util
{
  export class InterruptableTimeout extends OctObject
  {
    private callBacks: Function[];
    private length: number;
    private time: number;
    private started: boolean;

    constructor(time: number)
    {
      this.length    = time;
      this.callBacks = [];

      super();
    }

    public start(): void
    {
      if (!this.started) {
        this.started = true;
        this.time = window.setTimeout(this.run(), length);
      }
    }

    public interrupt(): void
    {
      if (this.started) {
        window.clearTimeout(this.time);
        this.started = false;
      }
    }

    public restart(): void
    {
      if (this.started) {
        this.interrupt();
      }
      this.start();
    }

    public addCallBack(f: Function): void
    {
      this.callBacks.push(f);
    }

    private run(): Function
    {
      var self = this;

      return function(): void
      {
        var i: number;

        self.started = false;

        for (i = 0; i < self.callBacks.length; i++) {
          self.callBacks[i]();
        }
      }
    }
  }
}
