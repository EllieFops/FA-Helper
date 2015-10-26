/**
 * HTTP Post Request
 *
 * @namespace octFAH.http.PostRequest
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.1
 * @since   0.3
 *
 * @param [url] {string}
 *
 * @constructor
 */
octFAH.http.PostRequest = function (url) {
  this.url   = url || "";
  this.data  = "";
  this.load  = [];
  this.error = [];
  this.abort = [];
  this.head  = {};
  this.http  = new XMLHttpRequest();
};

octFAH.http.PostRequest.prototype = Object.create(
  Object.prototype,
  {
    /**
     * Add an Event Handler for the Load event.
     *
     * @param func {Function}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    onLoad: function (func) {
      this.load.push(func);
      return this;
    },

    /**
     * Add an Event Handler for the Error event.
     *
     * @param func {Function}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    onError: function (func) {
      this.error.push(func);
      return this;
    },

    /**
     * Add an Event Handler for the Abort event.
     *
     * @param func {Function}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    onAbort: function (func) {
      this.abort.push(func);
      return this;
    },

    /**
     * Add an event handler for any HTTP event
     *
     * @param func {Function}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    onAny: function (func) {
      this.onAbort(func);
      this.onError(func);
      this.onLoad(func);

      return this;
    },

    /**
     * Set Post URL
     *
     * @param url {String}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    setUrl: function (url) {
      this.url = url;
      return this;
    },

    /**
     * Set Post Data
     *
     * @param data {String}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    setData: function (data) {
      this.data = data;
      return this;
    },

    /**
     * Set Request Header
     *
     * @param key {String}
     * @param val {String}
     *
     * @returns {octFAH.http.PostRequest|PostRequest}
     */
    setHeader: function (key, val) {
      this.head[key] = val;
      return this;
    },

    /**
     * Send Post Request
     */
    send: function () {
      var i;
      this.http.open("POST", this.url);

      for (i in this.head) {
        if (this.head.hasOwnProperty(i)) {
          this.http.setRequestHeader(i, this.head[i]);
        }
      }

      this.http.addEventListener("load",  this._genHandler(this.load));
      this.http.addEventListener("abort", this._genHandler(this.abort));
      this.http.addEventListener("error", this._genHandler(this.error));

      this.http.send(this.data);
    },


    /**
     * Generic Handler
     *
     * @param backs {Array} Callback handlers
     *
     * @returns {Function}
     */
    _genHandler: function(backs) {
      var self = this;

      return function (e) {
        var i;
        for (i = 0; i < backs.length; i++) {
          backs[i](e, self.http);
        }
      };
    }
  }
);