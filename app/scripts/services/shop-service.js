'use strict';

angular.module('reparacionesFeApp')
  .factory('ShopService', function (halClient) {
    return {
      load: function () {
        return halClient.$get('api/shop.json');
      }
    };
  });
