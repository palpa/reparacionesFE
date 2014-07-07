'use strict';

/**
 * @ngdoc directive
 * @name reparacionesFeApp.directive:appFooter
 * @description
 * # appFooter
 */
angular.module('reparacionesFeApp')
  .directive('appFooter', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/footer.html'
    };
  });
