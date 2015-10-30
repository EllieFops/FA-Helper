///<reference path="../_.ts"/>
///<reference path="..\ModalComponentInterface.ts"/>
///<reference path="..\..\..\..\wrap\OctWrap.ts"/>

namespace oct.fah.component.modal.shout
{
  export interface ShoutFormInterface extends ModalComponentInterface
  {
    getShoutForm(): wrap.OctWrap;

    getTitleSpan(): wrap.OctWrap;

    getWarningText(): wrap.OctWrap;

    getShoutTextArea(): wrap.OctWrap;

    getSubmitButton(): wrap.OctWrap;

    getDefaultCheckBox(): wrap.OctWrap;

    getCountInput(): wrap.OctWrap;

  }
}
