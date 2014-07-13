'use strict';

angular.module('reparacionesFeApp')
  .factory('ShopService', function (halClient, Config) {

    var apiRoot = Config.get('apiroot');
    
    return {
      load: function () {
        return halClient.$get(apiRoot);
      },
      getResource: function (resource, offset) {
        return this.load().then(function (shopResource) {
          return shopResource.$get(resource, {'offset': offset, 'limit': 10});
        }, function (result) {
          console.error('failed', result);
        });
      },
      createResource: function (href, resource) {
        return this.load().then(function (shopResource) {
          return shopResource.$post(href, null, resource);
        });
      }
    };
  });
