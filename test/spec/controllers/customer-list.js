'use strict';

describe('Controller: CustomerListCtrl', function () {

  // load the controller's module
  beforeEach(module('reparacionesFeApp'));

  var CustomerListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerListCtrl = $controller('CustomerListCtrl', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(CustomerListCtrl).toBeDefined();
  });

  it('should attach a title to the scope', function () {
    expect(scope.title).toEqual('Listado de Clientes');
  });
});
