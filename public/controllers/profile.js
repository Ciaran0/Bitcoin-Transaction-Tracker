angular.module('MyApp')
.controller('ProfileCtrl', [
        '$scope','transactions','token',
        function($scope,transactions,token) {
  $scope.transactions = transactions.transactions;
  $scope.selectedDate = new Date();
  $scope.addTransaction = function(){
    transactions.create(token.currentUserId(),{
      amount: $scope.amount,
      date: $scope.selectedDate
    });
  };

  $scope.getType = function(key) {
     return Object.prototype.toString.call($scope[key]);
   };

   $scope.clearDates = function() {
     $scope.selectedDate = null;
   };
}]);
