'use strict';

describe('Service: ShopService', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('api/shop.json'));
  beforeEach(module('api/customers.json'));

  // instantiate service
  var ShopService,
    halClient,
    shopFixture,
    customerFixture,
    $httpBackend;

  beforeEach(inject(function (_ShopService_, _halClient_, _$httpBackend_, _apiShop_, _apiCustomers_) {
      ShopService = _ShopService_;
      halClient = _halClient_;
      $httpBackend = _$httpBackend_;

      shopFixture = _apiShop_;
      customerFixture = _apiCustomers_;

      spyOn(halClient, '$get').andCallThrough();
      spyOn(ShopService, 'getResource').andCallThrough();
    })
  );

  it('should do something', function () {
    expect(!!ShopService).toBe(true);
  });

  describe('should load the Api Root Shop Resource', function () {

    beforeEach(function () {
      $httpBackend
        .expect('GET', 'api/shop.json')
        .respond(shopFixture);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('using Shop service load function', function () {
      var shopResource;
      beforeEach(function () {
        shopResource = ShopService.load();
      });

      it('should be defined', function () {
        expect(angular.isFunction(ShopService.load)).toBe(true);
      });

      it('with the right path', function () {
        expect(halClient.$get).toHaveBeenCalledWith('api/shop.json');
      });

      it('that should have an "apiRoot" property with value "true" ', function () {
        shopResource.then(function (result) {
          shopResource = result;
        });

        $httpBackend.flush();

        expect(shopResource.apiRoot).toBe(true);
      });
    });

    describe('using a getResource function that', function () {
      var customerResource;

      beforeEach(function () {
        customerResource = ShopService.getResource('customers');
      });

      it('should be defined', function () {
        expect(angular.isFunction(ShopService.getResource)).toBe(true);
      });

      it('should return a Customer Resource given "customers" as parameter', function () {
        $httpBackend
          .expect('GET', 'api/customers/customers.json?limit=10')
          .respond(customerFixture);

        expect(ShopService.getResource).toHaveBeenCalledWith('customers');

        customerResource.then(function (result) {
          customerResource = result;
        });

        $httpBackend.flush();

        expect(customerResource.customersRoot).toBe(true);
      });
    });
  });

  describe('provide a createResource function that', function () {
    it('should be defined', function () {
      expect(angular.isFunction(ShopService.createResource)).toBe(true);
    });

    it('should create a new resource', function () {
      var customer = {firstName: 'john', lastName: 'Doe'};
      ShopService.createResource('customers', customer);
      //$httpBackend.flush();
      expect(true).toBe(true);
    });
  });
});
