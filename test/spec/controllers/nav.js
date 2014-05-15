'use strict';

describe('Controller: NavCtrl', function () {

  // load the controller's module
  beforeEach(module('reparacionesFeApp'));

  var NavCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavCtrl = $controller('NavCtrl', {
      $scope: scope
    });
  }));

  it('should be defined', function () {
    expect(NavCtrl).toBeDefined();
  });

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
      expect(scope.isActive({path : '/customers'})).toBe(true);
    });

    it('should returns false for /customers path', function () {
      expect(scope.isActive({path : '/'})).toBe(false);
    });

  });

});
