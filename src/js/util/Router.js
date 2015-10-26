/**
 * Router
 *
 * @namespace octFAH.util.Router
 *
 * @author  Elizabeth Harper (elliefops@gmail.com)
 * @version 1.0
 * @since   0.5
 *
 * @constructor
 */
octFAH.util.Router = function () {
  this._routes = {};
};

octFAH.util.Router.prototype = Object.create(
  Object.prototype,
  {
    /**
     *
     * @param route      {string}
     * @param controller {octFAH.controller.Controller|Controller}
     */
    registerRoute: function (route, controller) {
      this._routes[route] = controller;
    },

    /**
     *
     * @param route {string}
     *
     * @returns {*}
     */
    route: function (route) {
      if (this._routes.hasOwnProperty(route)) {
        this._routes[route]._init();
        this._routes[route]._run();
      }
    }

  }
);