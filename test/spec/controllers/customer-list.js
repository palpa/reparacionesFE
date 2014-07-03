'use strict';

describe('Controller: CustomerListCtrl', function () {

  // load the controller's module
  beforeEach(module('reparacionesFeApp'));

  var CustomerListCtrl, CustomerService,
    scope;

  var mockCustomerResource = [
    {
      id: 123,
      name: 'Juan Mendoza'
    },
    {
      id: 124,
      name: 'Damian Palpacelli'
    }
  ];

  beforeEach(function () {
    module(function ($provide) {
      CustomerService = jasmine.createSpyObj('CustomerService', ['query']);
      $provide.value('CustomerService', CustomerService);
    });

    inject(function ($controller, $rootScope, _$q_) {

      var customerListDeferred = _$q_.defer();
      customerListDeferred.resolve(mockCustomerResource);
      CustomerService.query.andReturn(customerListDeferred.promise);

      // Initialize the controller and a mock scope
      scope = $rootScope.$new();
      CustomerListCtrl = $controller('CustomerListCtrl', {
        $scope: scope
      });
    });
  });

  it('should be defined', function () {
    expect(CustomerListCtrl).toBeDefined();
  });

  it('should attach a title to the scope', function () {
    expect(scope.title).toEqual('Listado de Clientes');
  });

  xit('should set the default value of orderProp model', function () {
    expect(scope.orderProp).toBe('lastName');
  });

  describe('should create a customers model that', function () {
    beforeEach(function () {
      scope.$apply();
    });

    it('should contain 2 customers', function () {
      expect(scope.customers.length).toEqual(2);
    });

    it('should have first customer with id "123" and name "Juan Mendoza"', function () {
      expect(scope.customers[0].id).toEqual(123);
      expect(scope.customers[0].name).toEqual('Juan Mendoza');
    });

    it('should have second customer with id "124" and name "Damian Palpacelli"', function () {
      expect(scope.customers[1].id).toEqual(124);
      expect(scope.customers[1].name).toEqual('Damian Palpacelli');
    });
  });
});
