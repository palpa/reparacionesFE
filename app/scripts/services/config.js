'use strict';

/**
 * @ngdoc service
 * @name reparacionesFeApp.Config
 * @description
 * # Config
 * Service in the reparacionesFeApp.
 */
angular.module('reparacionesFeApp')
  .service('Config', function Config() {
    /**
     * You can have as many environments as you like in here
     * just make sure the host matches up to your hostname including port
     */
    var _environments = {
        local: {
          host: 'localhost:9000',
          config: {
            /**
             * Add any config properties you want in here for this environment
             */
            apiroot: 'http://localhost:9090/api'
          }
        },
        local2: {
          host: '127.0.0.1:9000',
          config: {
            /**
             * Add any config properties you want in here for this environment
             */
            apiroot: 'http://localhost:9090/api'
          }
        },
        test: {
          host: 'localhost:8080',
          config: {
            /**
             * Add any config properties you want in here for this environment
             */
            apiroot: 'api/shop.json'
          }
        },
        cobertura: {
          host: 'localhost:8081',
          config: {
            /**
             * Add any config properties you want in here for this environment
             */
            apiroot: 'api/shop.json'
          }
        },
        prod: {
          host: 'production.com',
          config: {
            /**
             * Add any config properties you want in here for this environment
             */
            apiroot: 'https://production.com/api'
          }
        }
      },
      _environment;

    return {
      getEnvironment: function () {
        var host = window.location.host;

        if (_environment) {
          return _environment;
        }

        for (var environment in _environments) {
          if (typeof _environments[environment].host && _environments[environment].host === host) {
            _environment = environment;
            return _environment;
          }
        }
        //TODO: check what is better to return or throw an exception
        return null;
      },
      get: function (property) {
        return _environments[this.getEnvironment()].config[property];
      }
    };
  });
