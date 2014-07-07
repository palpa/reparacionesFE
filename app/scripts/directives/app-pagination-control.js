'use strict';

/**
 * @ngdoc directive
 * @name reparacionesFeApp.directive:appPaginationControl
 * @description
 * # appPaginationControl
 */
angular.module('reparacionesFeApp')
  .directive('appPaginationControl', function ($timeout) {

    function link(scope) {

      scope.onlyOnePage = true;

      scope.$watch('page', function (page) {

        if (page || false) {
          scope.onlyOnePage = (page.totalElements <= page.size);
        }
      });

      // Needed to wait for currentPage propagates to parent scope
      scope.changePage = function () {

        $timeout(function () {
          scope.pageChanged();
        }, 0, false);
      };
    }

    return {
      restrict: 'E',
      templateUrl: 'views/pagination-control.html',
      scope: {
        page: '=',
        currentPage: '=',
        pageChanged: '&onPageChanged'
      },
      link: link
    };
  });
