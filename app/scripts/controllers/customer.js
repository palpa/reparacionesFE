'use strict';

/**
 * @ngdoc function
 * @name reparacionesFeApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the reparacionesFeApp
 */
angular.module('reparacionesFeApp')
  .controller('CustomerCtrl', function ($scope, CustomerService) {
    $scope.tabs = [
      { title:'Consulta', templateUrl:'views/customer-list.html' },
      { title:'Alta', templateUrl:'views/customer-form.html'}
    ];



    $scope.reset = function() {
      console.log('reset');
      $scope.customer = {};
    };

    $scope.reset();

    $scope.update = function(){
      CustomerService.create($scope.customer).then(function () {
        $scope.message = 'Cliente Creado con exito';
        $scope.reset();
      });
    };

  });
