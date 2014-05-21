'use strict';

describe('Service: CustomerService', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  // instantiate service
  var CustomerService, ShopService, $rootScope;

  var mockCustomerResource = {
    customersRoot: true
  };

  beforeEach(function () {
    module(function ($provide) {
      ShopService = jasmine.createSpyObj('ShopService', ['getResource']);
      $provide.value('ShopService', ShopService);
    });

    inject(function (_CustomerService_, _$q_, _$rootScope_) {
      var customerResourceDeferred = _$q_.defer();
      customerResourceDeferred.resolve(mockCustomerResource);
      ShopService.getResource.andReturn(customerResourceDeferred.promise);


      CustomerService = _CustomerService_;
      $rootScope = _$rootScope_;
    });
  });

  it('should do something', function () {
    expect(!!CustomerService).toBe(true);
  });

  it('should have a query function defined', function () {
    expect(angular.isFunction(CustomerService.query)).toBe(true);
  });


  describe('should obtain Customer Resource from the ShopService so', function () {

    var customerResource;

    beforeEach(function () {
      customerResource = CustomerService.load();
    });

    it('should call ShopService.getResource() function with "customers" value', function () {
      expect(ShopService.getResource).toHaveBeenCalledWith('customers');
    });

    it('should return a Customer Resource promise', function () {
      customerResource.then(function (result) {
        customerResource = result;
      });

      $rootScope.$apply();

      expect(customerResource.customersRoot).toBe(true);
    });
  });


});

