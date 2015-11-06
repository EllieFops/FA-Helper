///<reference path="../_.ts"/>
///<reference path="MessagesShoutController.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\component\modal\shout\NewWatchersShoutForm.ts"/>
///<reference path="..\..\app\App.ts"/>
///<reference path="../../../wrap/OctWrapElementSetInterface.ts"/>
///<reference path="../../../wrap/OctWrapInterface.ts"/>

namespace oct.fah.controller.module
{
  import NewWatchersShoutForm       = oct.fah.component.modal.shout.NewWatchersShoutForm;
  import OctWrapElementSetInterface = oct.wrap.OctWrapElementSetInterface;
  import OctWrapInterface           = oct.wrap.OctWrapInterface;

  export class ShoutToWatchersController
  extends MessagesShoutController <ShoutToWatchersController>
  implements ControllerInterface
  {

    constructor(app: oct.fah.app.App)
    {
      super(app, "#messages-watches", new NewWatchersShoutForm(app));
    }

    public init(): void
    {
      super.init();

      this.watcherFieldSet.click(this.handleWatchersClick());
    }

    public run(): void
    {
      super.run();
    }

    private handleWatchersClick(): EventListener
    {
      var self: ShoutToWatchersController = this;
      return function(): void
      {
        var collection: OctWrapElementSetInterface, ch: OctWrapInterface, an: OctWrapInterface, co: number;

        collection = self.watcherFieldSet.children(":checked");
        co = 0;

        while (collection.hasNext()) {
          ch = collection.next();
          an = ch.getParent("table").find("a").first();

          if (an) {
            self.selected[an.getAttribute("href")] = "";
            co++;
          }
        }

        self.shoutForm.getCountInput().setValue(co.toString());
      };
    }
  }
}
