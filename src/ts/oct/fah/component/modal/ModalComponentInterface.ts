///<reference path="../_.ts"/>
///<reference path="..\UIComponentInterface.ts"/>
///<reference path="..\..\..\wrap\OctWrap.ts"/>

namespace oct.fah.component.modal
{
  export interface ModalComponentInterface extends UIComponentInterface
  {
    getContentDiv(): wrap.OctWrap;
    getCurtain(): wrap.OctWrap;
  }
}
