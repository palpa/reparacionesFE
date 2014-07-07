'use strict';

describe('Directive: appFooter', function () {

  // load the directive's module
  beforeEach(module('reparacionesFeApp'));

  beforeEach(module('views/footer.html'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should contain the footer div', inject(function ($compile) {
    element = angular.element('<app-footer></app-footer>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.html()).toContain('<div class="footer">');
    expect(element.text()).toContain('MP team developments');
  }));
});
