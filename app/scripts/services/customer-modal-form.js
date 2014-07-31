'use strict';

/**
 * @ngdoc service
 * @name reparacionesFeApp.CustomerModalForm
 * @description
 * # CustomerModalForm
 * Factory in the reparacionesFeApp.
 */
angular.module('reparacionesFeApp')
  .factory('CustomerModalForm', function ($modal) {

    var ModalInstanceCtrl = function ($scope, $modalInstance, readOnly, selectedCustomer, CustomerService) {

      var dataChanged = false;

      $scope.reset = function () {
        $scope.customer = angular.copy(selectedCustomer);
      };

      var setTitle = function () {
        if (readOnly.value) {
          $scope.formTitle = 'Datos del ';
        }
        else if (angular.equals(selectedCustomer, {})) {
          $scope.formTitle = 'Alta de ';
        }
        else {
          $scope.formTitle = 'Editar ';
        }
      };

      var setReadOnly = function (value) {
        readOnly.value = value;
        setTitle();
      };

      var setup = function () {
        setTitle();
        $scope.readOnly = readOnly;
        $scope.reset();
      };

      setup();

      $scope.submit = function () {
        if (angular.equals(selectedCustomer, {})) {
          CustomerService.create($scope.customer).then(function () {
            dataChanged = true;
            $scope.message = 'Cliente creado con éxito';
            $scope.reset();
          });
        } else {
          CustomerService.edit(selectedCustomer, $scope.customer).then(function () {
            setReadOnly(true);
            dataChanged = true;
            $scope.message = 'Cliente modificado con éxito';
          });
        }
      };

      $scope.edit = function () {
        setReadOnly(false);
        $scope.message = null;
      };

      $scope.close = function () {
        $modalInstance.close(dataChanged);
      };
    };

    // Public API here
    return {
      openCustomerModalForm: function (customer, readOnly) {

        var modalInstance = $modal.open({
          templateUrl: 'views/customer-form.html',
          controller: ModalInstanceCtrl,
          backdrop: false,
          keyboard: false,
          resolve: {
            readOnly: function () {
              return {value: readOnly};
            },
            selectedCustomer: function () {
              return customer;
            }
          }
        });

        return modalInstance.result.then(function (dataChanged) {
          return dataChanged;
        }, function (reason) {
          console.info('Modal dismissed at: ' + new Date() + ', ' + reason);
          return false;
        });
      }
    };
  });
