angular.module('MyApp')
  .controller('SignupCtrl', ['$scope', 'auth', function($scope, auth) {
    $scope.signup = function() {
      auth.signup({
        username: $scope.email,
        password: $scope.password
      });
    };
  }]);
