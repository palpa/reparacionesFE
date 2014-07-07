'use strict';

describe('Directive: appPaginationControl', function () {

  // load the directive's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('views/pagination-control.html'));

  var element,
    scope;

  var currentPage = 1;
  var page = {totalElements: 100, size: 10};

  beforeEach(inject(function ($rootScope, $compile) {

    var parentScope = $rootScope.$new();
    parentScope.currentPage = currentPage;
    parentScope.page = page;

    element = angular.element('<app-pagination-control page="page" current-page="currentPage"></app-pagination-control>');
    element = $compile(element)(parentScope);

    parentScope.$digest();
    scope = element.isolateScope();
  }));

  it('should show the page 1', function ($compile) {
    expect(scope.currentPage).toBe(1);
  });

  it('should has 100 elements in total', function ($compile) {
    expect(scope.page.totalElements).toBe(100);
  });

  it('should has 10 elements per page', function ($compile) {
    expect(scope.page.size).toBe(10);
  });
});
