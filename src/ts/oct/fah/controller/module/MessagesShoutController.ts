///<reference path="../_.ts"/>
///<reference path="ModalComponentController.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\component\modal\shout\ShoutFormInterface.ts"/>
///<reference path="..\..\..\wrap\OctWrap.ts"/>
///<reference path="..\..\..\wrap\OctWrapFactory.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.module
{
  import ShoutFormInterface = oct.fah.component.modal.shout.ShoutFormInterface;
  import OctWrapInterface   = oct.wrap.OctWrapInterface;
  import App                = oct.fah.app.App;
  import OctWrapFactory     = oct.wrap.OctWrapFactory;

  export class MessagesShoutController <T> extends ModalComponentController implements ControllerInterface
  {
    protected shoutForm:       ShoutFormInterface;
    protected watcherControls: OctWrapInterface;
    protected watcherFieldSet: OctWrapInterface;
    protected shoutButton:     OctWrapInterface;
    protected fieldId:         string;
    protected selected:        { [name: string]: string};

    constructor(app: App, field: string, form: ShoutFormInterface)
    {
      this.shoutForm = form;
      this.fieldId   = field;

      super(app, form);
    }

    public init(): void
    {
      var o: OctWrapFactory;

      super.init();

      o = this.app.getOctWrapFactory();

      this.watcherFieldSet = o.wrapSelector(this.fieldId);

      if (!this.watcherFieldSet) {
        this.watcherFieldSet = null;
        return;
      }

      this.watcherControls = this.watcherFieldSet.children("li.section-controls").first();

      this.modUI();
    }

    public run(): void
    {
      if (!this.watcherFieldSet) {
        return;
      }

      super.run();

      document.querySelector("body").appendChild(this.shoutForm.getElement());
    }

    private modUI(): void
    {
      this.shoutButton = this.app.getOctWrapFactory()
        .wrapNew("<input type=button value='Shout & Remove'>")
        .addClass("button")
        .click(this.handleShowShoutMenu());

      this.watcherControls.children().last().setBefore(this.shoutButton);
    }

    private handleShowShoutMenu(): EventListener
    {
      var self: MessagesShoutController <T> = this;

      return function (): void
      {
        self.shoutForm.show();
      };
    }
  }
}
