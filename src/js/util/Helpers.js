/**
 * General Utilities & Helpers
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */
octFAH.util.Helpers = (function ()
{
  var _app;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;

  /**
   * Helper Utilities
   *
   * @param app {Application}
   *
   * @constructor
   */
  function Helpers(app)
  {
    _app = app;
  }

  /**
   * Integer to px string
   *
   * @param i {int|string}
   *
   * @returns {string}
   */
  Helpers.prototype.toPx = function (i)
  {
    return i.toString() + 'px';
  };

  /**
   * Get Browser Type
   *
   * @returns {{name: string, version: number}}
   */
  Helpers.prototype.getBrowserType = function ()
  {
    var agent, tem, matches;

    agent   = navigator.userAgent;
    matches = agent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(matches[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(agent) || [];
      return {name: 'IE', version: (tem[1] || '')};
    }

    if (matches[1] === 'Chrome') {
      tem = agent.match(/\bOPR\/(\d+)/);
      if (tem !== null) {
        return {name: 'Opera', version: tem[1]};
      }
    }

    matches = matches[2] ? [matches[1], matches[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = agent.match(/version\/(\d+)/i)) !== null) {
      matches.splice(1, 1, tem[1]);
    }

    return {
      name:    matches[0],
      version: matches[1]
    };
  };

  /**
   * For Each
   *
   * Iterate through a given array or object and execute the given callback on
   * each element.
   *
   * <b>Getting Collection Data</b>
   *
   * <p>
   *   The callback function should accept 1 or 2 arguments.  In the event the
   *   callback accepts 2 arguments, argument 1 will be the key for the current
   *   element and argument 2 will be the value.  For callbacks accepting only
   *   one argument, the value will be passed in.
   * </p>
   *
   * <b>Breaking the ForEach Loop</b>
   *
   * <p>
   *   To stop the iteration through the loop, the callback function should
   *   return the boolean value 'false'.  All other return values will be
   *   ignored.
   * </p>
   *
   * @param collection {Array|Object}
   * @param func       {Function}
   */
  Helpers.prototype.forEach = function (collection, func)
  {
    var length, i, key, a, keys, s;

    s = this.getParamNames(func).length;

    if (collection instanceof Array) {
      a = true;
      length = collection.length;
    } else if (collection instanceof Object) {
      a = false;
      keys   = Object.keys(collection);
      length = keys.length;
    } else {
      return false;
    }

    for (i = 0; i < length;) {
      key = a ? i : keys[i];

      if (s === 1) {
        if (func(collection[key]) === false) {
          return;
        }
      } else if (s > 1) {
        if (func(key, collection[key]) === false) {
          return;
        }
      } else {
        if (func() === false) {
          return;
        }
      }
    }

  };

  /**
   * Get Parameter Names for a given function
   *
   * @param func {Function}
   *
   * @returns {Array|Object}
   */
  Helpers.prototype.getParamNames = function (func) {
    var fnStr, result;

    fnStr  = func.toString().replace(STRIP_COMMENTS, '');
    result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

    if(result === null){
      result = [];
    }

    return result;
  };

  return Helpers;
})();
