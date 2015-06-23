angular.module('MyApp')
  .controller('NavCtrl', ['$scope', 'bitcoinPrice', 'auth', 'token', function($scope, bitcoinPrice, auth, token) {
    $scope.isLoggedIn = token.isLoggedIn;
    $scope.currentUser = token.currentUser;
    $scope.logout = auth.logout;
    $scope.price = bitcoinPrice.getPrice;
  }]);
