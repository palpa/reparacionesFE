'use strict';

describe('Directive: navBar', function () {

  // load the directive's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('views/nav-bar.html'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element('<app-nav-bar></app-nav-bar>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    scope = element.isolateScope();
  }));

  it('should attach a list of Nav Items to the scope', function () {
    expect(scope.items.length).toBe(2);
  });

  describe('has an isActive function that', function () {

    beforeEach(inject(function ($location) {
      $location.path('/customers');
      scope.$apply();
    }));

    it('should be defined', function () {
      expect(scope.isActive).toBeDefined();
    });

    it('should returns true for /customers path', function () {
      expect(scope.isActive({path: '/customers'})).toBe(true);
    });

    it('should returns false for /customers path', function () {
      expect(scope.isActive({path: '/'})).toBe(false);
    });

  });
});
