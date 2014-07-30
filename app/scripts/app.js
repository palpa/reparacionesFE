'use strict';

/**
 * @ngdoc overview
 * @name reparacionesFeApp
 * @description
 * # reparacionesFeApp
 *
 * Main module of the application.
 */
angular
  .module('reparacionesFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-hal'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/customers', {
        templateUrl: 'views/customer-list.html',
        controller: 'CustomerListCtrl',
        controllerAs: 'customerList'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
