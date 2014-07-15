'use strict';

describe('Controller: CustomerFormCtrl', function () {

  // load the controller's module
  beforeEach(module('reparacionesFeApp'));

  var CustomerFormCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerFormCtrl = $controller('CustomerFormCtrl', {
      $scope: scope
    });
  }));

  it('should initialize with an empty customer', function () {
    expect(scope.customer).toEqual({});
  });
});
