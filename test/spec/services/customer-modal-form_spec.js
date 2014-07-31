'use strict';

describe('Service: CustomerModalForm', function () {

  // load the service's module
  beforeEach(module('reparacionesFeApp'));

  // instantiate service
  var CustomerModalForm;
  beforeEach(inject(function (_CustomerModalForm_) {
    CustomerModalForm = _CustomerModalForm_;
  }));

  it('should do something', function () {
    expect(!!CustomerModalForm).toBe(true);
  });

});
