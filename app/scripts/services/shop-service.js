'use strict';

angular.module('reparacionesFeApp')
  .factory('ShopService', function (halClient, Config) {

    var apiRoot = Config.get('apiroot');
    var apiRootResource = null;

    return {
      load: function () {
        if (apiRootResource === null) {
          apiRootResource = halClient.$get(apiRoot);
        }
        return apiRootResource;
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
