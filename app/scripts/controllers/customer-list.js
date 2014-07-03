'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function ($scope, CustomerService) {

    $scope.title = 'Listado de Clientes';

    var setup = function (offset) {
      CustomerService.query($scope, offset).then(function (customers) {
        $scope.customers = customers;
      });
    };

    $scope.pageChanged = function() {
      setup($scope.currentPage - 1);
    };

    $scope.currentPage = 1;
    $scope.pageChanged();

  })
;
