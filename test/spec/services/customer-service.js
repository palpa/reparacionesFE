'use strict';

describe('Service: CustomerService', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  // instantiate service
  var CustomerService, ShopService, $rootScope;

  var mockCustomerResource = {
    customersRoot: true,
    $get: function () {
    }
  };

  var mockCustomerList = [
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
      ShopService = jasmine.createSpyObj('ShopService', ['getResource']);
      $provide.value('ShopService', ShopService);
    });

    inject(function (_CustomerService_, _$q_, _$rootScope_) {
      var customerResourceDeferred = _$q_.defer();
      customerResourceDeferred.resolve(mockCustomerResource);
      ShopService.getResource.andReturn(customerResourceDeferred.promise);

      var customerListDeferred = _$q_.defer();
      customerListDeferred.resolve(mockCustomerList);
      spyOn(mockCustomerResource, '$get').andReturn(customerListDeferred.promise);


      CustomerService = _CustomerService_;
      $rootScope = _$rootScope_;
    });
  });

  it('should do something', function () {
    expect(!!CustomerService).toBe(true);
  });

  describe('has a query function that', function () {
    it('should be defined', function () {
      expect(angular.isFunction(CustomerService.query)).toBe(true);
    });

    xit('should return a list of customers', function () {
      var customerList = CustomerService.query();

      customerList.then(function (result) {
        customerList = result;
      });

      $rootScope.$apply();

      expect(customerList.length).toBe(2);
    });

  });


  describe('should obtain Customer Resource from the ShopService so', function () {

    var customerResource;

    beforeEach(function () {
      customerResource = CustomerService.load();
    });

    xit('should call ShopService.getResource() function with "customers" value', function () {
      expect(ShopService.getResource).toHaveBeenCalledWith('customers');
    });

    xit('should return a Customer Resource promise', function () {
      customerResource.then(function (result) {
        customerResource = result;
      });

      $rootScope.$apply();

      expect(customerResource.customersRoot).toBe(true);
    });
  });


});

