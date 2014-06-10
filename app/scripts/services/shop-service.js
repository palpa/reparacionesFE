'use strict';

angular.module('reparacionesFeApp')
  .factory('ShopService', function (halClient, Config) {

    var apiRoot = Config.get('apiroot');
    
    return {
      load: function () {
        return halClient.$get(apiRoot);
      },
      getResource: function (resource) {
        return this.load().then(function (shopResource) {
          return shopResource.$get(resource);
        }, function (result) {
          console.error('failed', result);
        });
      },
      getCustomersResource: function (resource) {
        return this.load().then(function (shopResource) {
          return shopResource.$get(resource);
        }, function (result) {
          console.error('failed', result);
        });
      }
    };
  });
