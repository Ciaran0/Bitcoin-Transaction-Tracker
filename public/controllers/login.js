angular.module('MyApp')
  .controller('LoginCtrl', ['$scope', 'auth', function($scope, auth) {
    $scope.login = function() {
      auth.login({
        username: $scope.email,
        password: $scope.password
      });
    };
  }]);
