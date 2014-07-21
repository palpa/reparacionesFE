'use strict';

angular.module('reparacionesFeApp')
  .factory('CustomerService', function (ShopService) {
    // Service logic
    var hrefCustomer = 'customers';
    var dataChanged = true;

    // Public API here
    return {
      dataChanged: function () {
        return dataChanged;
      },
      load: function (offset) {
        return ShopService.getResource(hrefCustomer, offset);
      },
      query: function (scope, offset) {
        return this.load(offset).then(function (customerResource) {
          scope.page = customerResource.page;
          return customerResource.$get('customerResourceList').then(function (customerResourceList) {
            dataChanged = false;
            return customerResourceList;
          });
        });
      },
      create: function (customer) {
        return ShopService.createResource(hrefCustomer, customer).then(function () {
          dataChanged = true;
        });
      },
      delete: function (customer) {
        return customer.$del('self').then(function () {
          dataChanged = true;
        });
      }
    };
  });
