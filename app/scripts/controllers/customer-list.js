'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function (CustomerService, $modal) {

    this.title = 'Listado de Clientes';

    var setup = function (offset, customerList) {
      CustomerService.query(offset).then(function (result) {
        customerList.customers = result.customers;
        customerList.page = result.page;
      });
    };

    // Decrease current page number if it is needed for deletions
    var isLastEmptyPage = function (customerList) {
      if (customerList.currentPage > 1 &&
        customerList.page.totalPages === customerList.currentPage &&
        customerList.customers.length === 0) {
        return true;
      }
      return false;
    };

    this.pageChanged = function () {
      setup(this.currentPage - 1, this);
    };

    //Init
    this.currentPage = 1;
    this.pageChanged();

    this.removeCustomer = function (index, customer) {
      this.customers.splice(index, 1);

      var customerList = this;

      CustomerService.delete(customer).then(function () {
        customerList.pageChanged();
      });

      if (isLastEmptyPage(this)) {
        this.currentPage--;
        this.pageChanged();
      }
    };

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

    var openCustomerModalForm = function (customer, readOnly, customerList) {

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

      modalInstance.result.then(function (dataChanged) {
        if (dataChanged) {
          customerList.pageChanged();
        }
      }, function (reason) {
        console.info('Modal dismissed at: ' + new Date() + ', ' + reason);
      });
    };

    this.viewCustomerDetails = function (customer) {
      openCustomerModalForm(customer, true, this);
    };

    this.editCustomer = function (customer) {
      openCustomerModalForm(customer, false, this);
    };

    this.addCustomer = function () {
      openCustomerModalForm({}, false, this);
    };
  });
