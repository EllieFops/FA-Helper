/**
 * Router
 *
 * @memberof octFAH.util
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.0
 * @since   0.5
 *
 * @constructor
 */
octFAH.util.Router = function () {
  /**
   *
   * @type {Object.<string, octFAH.controller.Controller>}
   * @private
   */
  this._routes = {};
};

octFAH.util.Router.prototype = Object.create(Object.prototype);

/**
 *
 * @param route      {string}
 * @param controller {octFAH.controller.Controller}
 *
 * @public
 */
octFAH.util.Router.prototype.registerRoute = function (route, controller) {
  this._routes[route] = controller;
};

/**
 *
 * @param route {string}
 *
 * @public
 */
octFAH.util.Router.prototype.route = function (route) {
  if (this._routes.hasOwnProperty(route)) {
    this._routes[route].init();
    this._routes[route].run();
  }
};