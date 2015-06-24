angular.module('MyApp').controller('ProfileCtrl', ['$scope', function($scope) {
  $scope.selectedDate = new Date();
  $scope.getType = function(key) {
     return Object.prototype.toString.call($scope[key]);
   };

   $scope.clearDates = function() {
     $scope.selectedDate = null;
   };
}]);
