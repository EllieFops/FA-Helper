/**
 * HTTP Post Request
 *
 * @version 1.0
 * @since   0.1
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.http
 */
octFAH.http.PostRequest = (function ()
{

  "use strict";

  /**
   * Post Request
   *
   * @param u [String]
   *
   * @constructor
   */
  function PostRequest(u)
  {
    this.url   = u || "";
    this.data  = "";
    this.load  = [];
    this.error = [];
    this.abort = [];
    this.head  = {};
    this.http  = new XMLHttpRequest();
  }

  /**
   * Add an Event Handler for the Load event.
   *
   * @param func {Function}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.onLoad = function (func)
  {
    this.load.push(func);
    return this;
  };

  /**
   * Add an Event Handler for the Error event.
   *
   * @param func {Function}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.onError = function (func)
  {
    this.error.push(func);
    return this;
  };

  /**
   * Add an Event Handler for the Abort event.
   *
   * @param func {Function}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.onAbort = function (func)
  {
    this.abort.push(func);
    return this;
  };

  /**
   * Add an event handler for any HTTP event
   *
   * @param func {Function}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.onAny = function (func)
  {
    this.onAbort(func);
    this.onError(func);
    this.onLoad(func);

    return this;
  };

  /**
   * Set Post URL
   *
   * @param url {String}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.setUrl = function (url)
  {
    this.url = url;
    return this;
  };

  /**
   * Set Post Data
   *
   * @param data {String}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.setData = function (data)
  {
    this.data = data;
    return this;
  };

  /**
   * Set Request Header
   *
   * @param key {String}
   * @param val {String}
   *
   * @returns {octFAH.http.PostRequest|PostRequest}
   */
  PostRequest.prototype.setHeader = function (key, val)
  {
    this.head[key] = val;
    return this;
  };

  /**
   * Send Post Request
   */
  PostRequest.prototype.send = function ()
  {
    var i;
    this.http.open("POST", this.url);

    for (i in this.head) {
      if (this.head.hasOwnProperty(i)) {
        this.http.setRequestHeader(i, this.head[i]);
      }
    }

    this.http.addEventListener("load", genHandler(this.load, this));
    this.http.addEventListener("abort", genHandler(this.abort, this));
    this.http.addEventListener("error", genHandler(this.error, this));

    this.http.send(this.data);
  };

  /**
   * Generic Handler
   *
   * @param backs {Array}
   * @param self  {octFAH.http.PostRequest|PostRequest}
   *
   * @returns {Function}
   */
  function genHandler(backs, self)
  {
    return function (e)
    {
      var i;
      for (i = 0; i < backs.length; i++) {
        backs[i](e, self.http);
      }
    };
  }

  return PostRequest;
})();