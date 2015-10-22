/**
 * TamperMonkey Storage Interface
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */

octFAH.util.Storage = (function() {
  function Storage()
  {}

  Storage.prototype.fetchValue = function (key, defValue)
  {
    return GM_getValue(key, defValue);
  };

  Storage.prototype.pushValue = function (key, value)
  {
    GM_setValue(key, value);
  };
  
  return Storage;
})();
