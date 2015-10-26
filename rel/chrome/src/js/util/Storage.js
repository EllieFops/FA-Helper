/**
 * Chrome Storage Interface
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */
octFAH.util.Storage = (function () {
  function Storage() {
  }

  Storage.prototype.fetchValue = function (key, defValue) {
    return chrome.storage.get(key) || defValue;
  };

  /**
   * Store data at the given key
   *
   * @param key   {string}
   * @param value {*}
   */
  Storage.prototype.pushValue = function (key, value) {
    var object  = {};
    object[key] = value;
    chrome.storage.sync.set(object);
  };

  return Storage;
})();
