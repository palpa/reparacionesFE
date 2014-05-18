'use strict';

describe('Service: customerService', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  // instantiate service
  var CustomerService, ShopService;

  beforeEach(function () {
    module(function ($provide) {
      ShopService = jasmine.createSpyObj('ShopService', ['getResource']);
      $provide.value('ShopService', ShopService);
    });

    inject(function (_CustomerService_) {
      CustomerService = _CustomerService_;
    });
  });

  it('should do something', function () {
    expect(!!CustomerService).toBe(true);
  });

  it('should call ShopService.getResource(customers)', function () {
    expect(ShopService.getResource).toHaveBeenCalledWith('customers');
  });

  it('should have a query function', function () {
    expect(angular.isFunction(CustomerService.query)).toBe(true);
  });
});
