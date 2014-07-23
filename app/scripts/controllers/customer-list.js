'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function ($scope, CustomerService, $modal) {

    $scope.title = 'Listado de Clientes';

    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

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

    $scope.viewCustomerDetails = function (customer) {

      var modalInstance = $modal.open({
        templateUrl: 'views/customer-form.html',
        scope: $scope
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

  });
