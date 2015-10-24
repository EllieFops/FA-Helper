/**
 * Router
 *
 * @version 1.0
 * @since   0.5
 *
 * @author Elizabeth Harper
 *
 * @namespace octFAH.util
 */
octFAH.util.Router = (function ()
{
  "use strict";

  function Router()
  {
    this._routes = {};
  }

  /**
   *
   * @param route      {string}
   * @param controller {octFAH.controller.Controller|Controller}
   */
  Router.prototype.registerRoute = function (route, controller)
  {
    this._routes[route] = controller;
  };

  /**
   *
   * @param route {string}
   *
   * @returns {*}
   */
  Router.prototype.route = function (route)
  {
    if (this._routes.hasOwnProperty(route)) {
      this._routes[route].init();
      this._routes[route].run();
    }
  };

  return Router;
}());