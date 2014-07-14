'use strict';

/**
 * @ngdoc directive
 * @name reparacionesFeApp.directive:appCustomerTabs
 * @description
 * # appCustomerTabs
 */
angular.module('reparacionesFeApp')
  .directive('appCustomerTabs', function () {

    function link(scope) {
      scope.logSelected = function (tab) {
        console.log('Selected tab: ' + tab);
      };

      scope.tabs = [
        { title: 'Consulta', templateUrl: 'views/customer-list.html', select: scope.logSelected},
        { title: 'Alta', templateUrl: 'views/customer-form.html'}
      ];
    }

    return {
      restrict: 'E',
      templateUrl: 'views/customer-tabs.html',
      link: link
    };
  });
