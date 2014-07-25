'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function ($scope, CustomerService, $modal) {

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

    $scope.viewCustomerDetails = function (customer) {
      console.log(customer);
    };

    $scope.addCustomer = function () {
      openCustomerModalForm();
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, CustomerService) {

      $scope.reset = function () {
        $scope.customer = {};
      };

      $scope.reset();

      $scope.update = function () {
        CustomerService.create($scope.customer).then(function () {
          $scope.message = 'Cliente Creado con exito';
          $scope.reset();
        });
      };

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    var openCustomerModalForm = function () {

      var modalInstance = $modal.open({
        templateUrl: 'views/customer-form.html',
        controller: ModalInstanceCtrl,
        scope: $scope
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

  });