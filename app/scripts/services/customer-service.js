'use strict';

angular.module('reparacionesFeApp')
  .factory('CustomerService', function (ShopService) {
    // Service logic
    var hrefCustomer = 'customers';

    // Public API here
    return {
      load: function (offset) {
        return ShopService.getResource(hrefCustomer, offset);
      },
      query: function (scope, offset) {
        return this.load(offset).then(function (customerResource) {
          scope.page = customerResource.page;
          return customerResource.$get('customerResourceList');
        });
      }
      ,
      create: function (customer) {
        return ShopService.createResource(hrefCustomer, customer);
      }
    };
  });
