'use strict';

describe('Service: ShopService', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  // instantiate service
  var ShopService, halClient, $httpBackend;

  beforeEach(inject(function (_ShopService_, _halClient_, _$httpBackend_) {
      ShopService = _ShopService_;
      halClient = _halClient_;
      $httpBackend = _$httpBackend_;

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
        .respond({
          'apiRoot': true,
          'name': 'MyM',
          '_links': {
            'self': {
              'href': '/api/shop.json'
            },
            'customers': {
              'href': '/customers/customers.json{?offset,limit}',
              'templated': true
            }
          }
        });
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
          .respond({
            'customersRoot': true,
            '_links': {
              'self': {
                'href': '/customers/customers.json{?page,size,sort}',
                'templated': true
              }
            },
            '_embedded': {
              'emb:customers': [
                {
                  '_links': {
                    'self': {
                      'href': '/customers/123'
                    }
                  },
                  'id': '123',
                  'name': 'Juan Mendoza'
                },
                {
                  '_links': {
                    'self': {
                      'href': '/customers/124'
                    }
                  },
                  'id': '124',
                  'name': 'Damian Palpacelli'
                }
              ]
            }
          });

        expect(ShopService.getResource).toHaveBeenCalledWith('customers');

        customerResource.then(function (result) {
          customerResource = result;
        });

        $httpBackend.flush();

        expect(customerResource.customersRoot).toBe(true);
      });
    });
  });
});
