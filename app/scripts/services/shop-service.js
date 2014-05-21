'use strict';

angular.module('reparacionesFeApp')
  .factory('ShopService', function (halClient) {
    return {
      load: function () {
        return halClient.$get('api/shop.json');
      },
      getResource: function (resource) {
        return this.load().then(function (shopResource) {
          return shopResource.$get(resource);
        }, function (result) {
          console.error('failed', result);
        });
      }
    };
  });
