'use strict';

angular
  .module('reparacionesFeApp', [
    'ngCookies',
    'ngSanitize',
    'ngRoute',
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
        templateUrl: 'views/customer-tabs.html',
        controller: 'CustomerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
