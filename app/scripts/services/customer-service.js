'use strict';

angular.module('reparacionesFeApp')
  .factory('CustomerService', function (ShopService) {
    // Service logic

    // Public API here
    return {
      load: function (offset) {
        return ShopService.getCustomersResource(offset);
      },
      query: function (scope, offset) {
        return this.load(offset).then(function (customerResource) {
          scope.page = customerResource.page;
          return customerResource.$get('customerResourceList');
        });
      }
    };
  });
