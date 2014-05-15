'use strict';

angular.module('reparacionesFeApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.items = [
      {path: '/', title: 'Home'},
      {path: '/customers', title: 'Clientes'}
    ];

    $scope.isActive = function (item) {
      return (item.path === $location.path());
    };
  });
