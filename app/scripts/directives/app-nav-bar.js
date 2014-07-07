'use strict';

/**
 * @ngdoc directive
 * @name reparacionesFeApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('reparacionesFeApp')
  .directive('appNavBar', function ($location) {
    return {
      restrict: 'E',
      templateUrl: 'views/nav-bar.html',
      scope: {},
      link: function(scope) {
        scope.items = [
          {path: '/', title: 'Home'},
          {path: '/customers', title: 'Clientes'}
        ];

        scope.isActive = function (item) {
          return (item.path === $location.path());
        };
      }
    };
  });
