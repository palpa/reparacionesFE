'use strict';

describe('Service: ShopService', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  // instantiate service
  var ShopService, halClient;


  beforeEach(function () {

    module(function ($provide) {
      halClient = jasmine.createSpyObj('halClient', ['$get']);
      $provide.value('halClient', halClient);
    });

    inject(function (_ShopService_) {
      ShopService = _ShopService_;
    });
  });

  it('should do something', function () {
    expect(!!ShopService).toBe(true);
  });

  // check to see if it has the expected function
  it('should have a getResource function', function () {
    expect(angular.isFunction(ShopService.getResource)).toBe(true);
  });

  it('should have a halClient with a $get function defined', function () {
    expect(halClient.$get).toBeDefined();
  });

  it('should call halClient.$get(apiRootUrl)', function () {
    ShopService.load();
    expect(halClient.$get).toHaveBeenCalledWith('api/shop.json');
  });

  it('should have a getResource function', function () {
    expect(angular.isFunction(ShopService.getResource)).toBe(true);
  });

});
