///<reference path="../_.ts"/>
///<reference path="ShoutForm.ts"/>
///<reference path="ShoutFormInterface.ts"/>
///<reference path="..\..\..\app\App.ts"/>

namespace oct.fah.component.modal.shout
{
  export class NewFavoriteShoutForm extends ShoutForm implements ShoutFormInterface
  {
    constructor(app: oct.fah.app.App)
    {
      this.implementationOf("ShoutFormInterface");
      super(app);
    }


    public init(): void
    {
      super.init();

      this.title.html("Shout To Selected Watchers");
    }
  }
}
