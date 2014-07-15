'use strict';

describe('Directive: appCustomerTabs', function () {

  // load the directive's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('views/customer-tabs.html'));
  beforeEach(module('views/customer-list.html'));
  beforeEach(module('views/customer-form.html'));
  beforeEach(module('views/pagination-control.html'));

  beforeEach(module('api/shop.json'));

  var element,
    scope,
    shopFixture,
    $httpBackend;

  beforeEach(inject(function ($rootScope, _$httpBackend_, _apiShop_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    shopFixture = _apiShop_;
  }));

  beforeEach(function () {
    $httpBackend
      .expect('GET', 'api/shop.json')
      .respond(shopFixture);
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should attach a list of tabs', inject(function ($compile) {
    element = angular.element('<app-customer-tabs></app-customer-tabs>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.scope().tabs.length).toBe(2);
  }));
});
