'use strict';

angular.module('reparacionesFeApp')
  .controller('CustomerListCtrl', function (CustomerService, CustomerModalForm) {

    this.title = 'Listado de Clientes';

    var requestPage = function (offset, customerList) {
      CustomerService.query(offset).then(function (result) {
        customerList.customers = result.customers;
        customerList.page = result.page;
      });
    };

    var isLastEmptyPage = function (customerList) {
      if (customerList.currentPage > 1 &&
        customerList.page.totalPages === customerList.currentPage &&
        customerList.customers.length === 0) {
        return true;
      }
      return false;
    };

    this.pageChanged = function () {
      requestPage(this.currentPage - 1, this);
    };

    var setup = function (customerList) {
      customerList.currentPage = 1;
      customerList.pageChanged();
    };

    setup(this);


    this.removeCustomer = function (index, customer) {

      // Remove customer from the collection
      this.customers.splice(index, 1);

      // Decrease current page number
      // if it is the last empty page after deletion
      if (isLastEmptyPage(this)) {
        this.currentPage--;
      }

      var customerList = this;
      // Remove customer from the server
      CustomerService.delete(customer).then(function () {
        customerList.pageChanged();
      });
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
