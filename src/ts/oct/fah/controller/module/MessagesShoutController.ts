///<reference path="../_.ts"/>
///<reference path="ModalComponentController.ts"/>
///<reference path="..\ControllerInterface.ts"/>
///<reference path="..\..\component\modal\shout\ShoutFormInterface.ts"/>
///<reference path="..\..\..\wrap\OctWrap.ts"/>
///<reference path="..\..\..\wrap\OctWrapFactory.ts"/>
///<reference path="..\..\app\App.ts"/>

namespace oct.fah.controller.module
{
  export class MessagesShoutController <T> extends ModalComponentController implements ControllerInterface
  {
    private shoutForm: component.modal.shout.ShoutFormInterface;
    private watcherControls: wrap.OctWrap;
    private watcherFieldSet: wrap.OctWrap;
    private shoutButton: wrap.OctWrap;
    private fieldId: string;
    private selected: {name: string, id: string}[];

    constructor(app: oct.fah.app.App, field: string, form: component.modal.shout.ShoutFormInterface)
    {
      this.shoutForm = form;
      this.fieldId   = field;

      super(app);
    }

    public init(): void
    {
      var o: wrap.OctWrapFactory;
      super.init();

      o = this.app.getOctWrapFactory();

      this.watcherFieldSet = o.wrapSelector(this.fieldId);
      this.watcherControls = this.watcherFieldSet.children("li.section-controls").first();

      this.modUI();
    }

    public run(): void
    {
      super.run();

      document.querySelector("body").appendChild(this.shoutForm.getElement());
    }

    private modUI(): void
    {
      this.shoutButton = this.app.getOctWrapFactory()
        .wrapNew("<input type=button value='Shout &amp; Remove'>")
        .addClass("button")
        .click(this.handleShowShoutMenu());

      this.watcherControls.children().last().before(this.shoutButton);
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
