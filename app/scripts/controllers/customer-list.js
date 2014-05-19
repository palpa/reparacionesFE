'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function ($scope, CustomerService) {

    $scope.title = 'Listado de Clientes';

    // set the default order property
    $scope.orderProp = 'name';

    CustomerService.query().then(function(customers) {
      $scope.customers = customers;
    });

  })
;
