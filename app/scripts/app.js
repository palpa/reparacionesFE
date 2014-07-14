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
        template: '<app-customer-tabs></app-customer-tabs>'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
