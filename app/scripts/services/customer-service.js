'use strict';

angular.module('reparacionesFeApp')
  .factory('CustomerService', function (ShopService) {
    // Service logic

    // Public API here
    return {
      load: function () {
        return ShopService.getResource('customers');
      },
      query: function () {
        return this.load().then(function (customerResource) {
          return customerResource.$get('emb:customers');
        });
      }
    };
  });
