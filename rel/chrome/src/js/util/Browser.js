/**
 * Chrome Browser Interface
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */
octFAH.util.Browser = (function () {
  function Browser() {
  }

  /**
   * Create a new browser tab
   *
   * @param url        {string}
   * @param background {boolean}
   */
  Browser.prototype.makeNewTab = function (url, background) {
    chrome.tabs.create({url: "url", selected: background});
  };

  return Browser;
})();
