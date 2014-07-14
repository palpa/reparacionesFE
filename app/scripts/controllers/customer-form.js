'use strict';

/**
 * @ngdoc function
 * @name reparacionesFeApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the reparacionesFeApp
 */
angular.module('reparacionesFeApp')
  .controller('CustomerFormCtrl', function ($scope, CustomerService) {

    $scope.reset = function () {
      $scope.customer = {};
    };

    $scope.reset();

    $scope.update = function () {
      CustomerService.create($scope.customer).then(function () {
        $scope.message = 'Cliente Creado con exito';
        $scope.reset();
      });
    };

  });
