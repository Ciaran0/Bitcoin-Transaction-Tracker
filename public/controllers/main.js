angular.module('MyApp')
  .controller('MainCtrl', ['$scope', 'bitcoinPrice', function($scope, bitcoinPrice) {
    $scope.headingTitle = 'Bitcoin Tracker';
    $scope.price = bitcoinPrice.getPrice();
  }]);
