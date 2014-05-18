'use strict';

angular.module('reparacionesFeApp')
  .factory('CustomerService', function (ShopService) {
    // Service logic
    var customersResource = ShopService.getResource('customers');

    // Public API here
    return {
      query: function () {
        return customersResource.then(function (resource) {
          return resource.$get('emb:customers');
        });
      }
    };
  });
