'use strict';

/**
 * @ngdoc directive
 * @name reparacionesFeApp.directive:appHeader
 * @description
 * # appHeader
 */
angular.module('reparacionesFeApp')
  .directive('appHeader', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/header.html'
    };
  });
