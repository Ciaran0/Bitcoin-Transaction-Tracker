angular.module('MyApp')
  .controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.login = function() {
      Auth.login({
        username: $scope.email,
        password: $scope.password
      });
    };
  }]);
