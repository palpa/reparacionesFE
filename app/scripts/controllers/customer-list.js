'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function (CustomerService, CustomerModalForm) {

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

    var openCustomerModalForm = function (customer, readOnly, customerList) {

      CustomerModalForm.openCustomerModalForm(customer, readOnly).then(function (dataChanged) {
        if (dataChanged) {
          customerList.pageChanged();
        }
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
