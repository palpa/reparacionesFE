'use strict';

describe('Controller: CustomerListCtrl', function () {

  // load the controller's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('api/shop.json'));
  beforeEach(module('api/customers.json'));

  var CustomerListCtrl,
      $httpBackend,
      shopFixture,
      customerFixture,
      scope;

  beforeEach(function () {
    module(function () {
      // CustomerService = jasmine.createSpyObj('CustomerService', ['query']);
      // $provide.value('CustomerService', CustomerService);
    });

    inject(function ($controller, $rootScope, _$httpBackend_, _apiShop_, _apiCustomers_) {

      // var customerListDeferred = _$q_.defer();
      // customerListDeferred.resolve(mockCustomerResource);
      // CustomerService.query.andReturn(customerListDeferred.promise);

      $httpBackend = _$httpBackend_;
      shopFixture = _apiShop_;
      customerFixture = _apiCustomers_;

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
    expect(CustomerListCtrl.title).toEqual('Listado de Clientes');
  });

  xit('should set the default value of orderProp model', function () {
    expect(scope.orderProp).toBe('lastName');
  });

  describe('should create a customers model that', function () {

    beforeEach(function () {
      $httpBackend
        .expect('GET', 'api/shop.json')
        .respond(shopFixture);

      $httpBackend
        .expect('GET', 'api/customers/customers.json?offset=0&limit=10')
        .respond(customerFixture);

      $httpBackend.flush();
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should contain 2 customers', function () {
      expect(scope.customers.length).toEqual(2);
    });

    it('should have first customer with id "123" and name "Juan Mendoza"', function () {
      expect(scope.customers[0].id).toEqual('123');
      expect(scope.customers[0].name).toEqual('Juan Mendoza');
    });

    it('should have second customer with id "124" and name "Damian Palpacelli"', function () {
      expect(scope.customers[1].id).toEqual('124');
      expect(scope.customers[1].name).toEqual('Damian Palpacelli');
    });
  });
});
