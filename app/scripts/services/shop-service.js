'use strict';

angular.module('reparacionesFeApp')
  .factory('ShopService', function (halClient) {
    var apiRoot  = halClient.$get('api/shop.json');

    return {
      getResource: function (resource) {
        return apiRoot.then(function (shopResource) {
          return shopResource.$get(resource);
        }, function (result) {
          console.error('failed', result);
        });
      }
    };
  });
