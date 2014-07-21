'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function ($scope, CustomerService) {

    $scope.title = 'Listado de Clientes';

    var setup = function (offset) {
      CustomerService.query($scope, offset).then(function (customers) {
        $scope.customers = customers;
      });
    };

    $scope.pageChanged = function () {
      $scope.isLastEmptyPage();
      setup($scope.currentPage - 1);
    };

    $scope.currentPage = 1;

    $scope.$watch(function () {
      return CustomerService.dataChanged();
    }, function (newValue) {
      //console.log(newValue + '-' + oldValue);
      if (newValue || !$scope.customers) {
        $scope.pageChanged();
      }
    });

    // Decrease current page number if it is needed for deletions
    $scope.isLastEmptyPage = function () {
      if ($scope.currentPage > 1 &&
        $scope.page.totalPages === $scope.currentPage &&
        $scope.customers.length === 0) {

        $scope.currentPage--;
      }
    };

    $scope.removeCustomer = function (index, customer) {
      $scope.customers.splice(index, 1);
      CustomerService.delete(customer);
    };
  });
