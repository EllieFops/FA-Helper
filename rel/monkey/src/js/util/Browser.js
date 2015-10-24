/**
 * TamperMonkey Browser Interface
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */
octFAH.util.Browser = (function () {
  "use strict";

  function Browser() {
  }

  Browser.prototype.makeNewTab = function (url, background) {
    GM_openInTab(url, background);
  };

  return Browser;
})();
