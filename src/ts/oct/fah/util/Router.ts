///<reference path="../_.ts"/>
///<reference path="..\controller\ControllerInterface.ts"/>

namespace oct.fah.util
{
  export class Router
  {
    private routes: { controller: controller.ControllerInterface, route: string; }[];

    constructor()
    {
      this.routes = [];
    }

    public register(route: string, controller: controller.ControllerInterface): Router
    {
      this.routes.push({
        "route": route,
        "controller": controller
      });
      return this;
    }

    public route(path: string): void
    {
      var n: number;
      for (n = 0; n < this.routes.length; n++) {
        if (path.indexOf(this.routes[n].route) !== -1) {
          this.routes[n].controller.init();
          this.routes[n].controller.run();
        }
      }
    }
  }
}
