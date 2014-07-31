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
      query: function (offset) {
        return this.load(offset).then(function (customerResource) {
          return customerResource.$get('customerResourceList').then(function (customerResourceList) {
            return {customers: customerResourceList, page: customerResource.page};
          });
        });
      },
      create: function (customer) {
        return ShopService.createResource(hrefCustomer, customer);
      },
      edit: function (customer, data) {
        return customer.$put('self', null, data);
      },
      delete: function (customer) {
        return customer.$del('self');
      }
    };
  });
