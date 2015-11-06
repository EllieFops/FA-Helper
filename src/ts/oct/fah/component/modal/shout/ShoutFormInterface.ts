///<reference path="../_.ts"/>
///<reference path="..\ModalComponentInterface.ts"/>
///<reference path="..\..\..\..\wrap\OctWrap.ts"/>

namespace oct.fah.component.modal.shout
{
  export interface ShoutFormInterface extends ModalComponentInterface
  {
    getShoutForm(): wrap.OctWrapInterface;

    getTitleSpan(): wrap.OctWrapInterface;

    getWarningText(): wrap.OctWrapInterface;

    getShoutTextArea(): wrap.OctWrapInterface;

    getSubmitButton(): wrap.OctWrapInterface;

    getDefaultCheckBox(): wrap.OctWrapInterface;

    getCountInput(): wrap.OctWrapInterface;

  }
}
