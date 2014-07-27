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
      $scope.myCustomer = customer;
      $scope.formDisabled = true;
      $scope.formTitle = 'Datos del ';
      openCustomerModalForm();
    };

    $scope.editCustomer = function (customer) {
      $scope.myCustomer = customer;
      $scope.formDisabled = false;
      $scope.formTitle = 'Editar ';
      openCustomerModalForm();
    };

    $scope.addCustomer = function () {
      $scope.myCustomer = {};
      $scope.formDisabled = false;
      $scope.formTitle = 'Alta de ';
      openCustomerModalForm();
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, CustomerService) {

      $scope.reset = function () {
        $scope.customer = angular.copy($scope.myCustomer);
      };

      $scope.reset();

      $scope.submit = function () {
        if (angular.equals($scope.myCustomer, {})) {
          CustomerService.create($scope.customer).then(function () {
            $scope.message = 'Cliente creado con exito';
            $scope.reset();
          });
        } else {
          CustomerService.edit($scope.myCustomer, $scope.customer).then(function () {
            $scope.formDisabled = true;
            $scope.formTitle = 'Datos del ';
            $scope.message = 'Cliente modificado con exito';
          });
        }
      };

      $scope.edit = function () {
        $scope.formDisabled = false;
        $scope.formTitle = 'Editar ';
        $scope.message = null;
      };

      $scope.close = function () {
        $modalInstance.close();
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