'use strict';

angular
  .module('reparacionesFeApp', [
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'angular-hal'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
