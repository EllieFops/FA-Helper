///<reference path="../_.ts"/>
///<reference path="..\controller\ControllerInterface.ts"/>

namespace oct.fah.util
{
  export class Router
  {
    private routes: { [route: string]: controller.ControllerInterface; };

    constructor()
    {
      this.routes = {};
    }

    public register(route: string, controller: controller.ControllerInterface): Router
    {
      this.routes[route] = controller;
      return this;
    }

    public route(path: string): void
    {
      if (typeof this.routes[path] !== "undefined") {
        this.routes[path].init();
        this.routes[path].run();
      }
    }
  }
}
