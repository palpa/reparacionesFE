'use strict';

describe('Directive: appHeader', function () {

  // load the directive's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('views/header.html'));
  beforeEach(module('views/nav-bar.html'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should contain the header div', inject(function ($compile) {
    element = angular.element('<app-header></app-header>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.html()).toContain('<div class="header">');
  }));
});
