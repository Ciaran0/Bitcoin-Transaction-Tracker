angular.module('MyApp')
.controller('ProfileCtrl', [
        '$scope','transactions','token',
        function($scope,transactions,token) {
  $scope.transactions = transactions.transactions;
  $scope.amount =0;
  $scope.addTransaction = function(){
    transactions.create(token.currentUserId(),{
      amount: $scope.amount
    });
  };
  $scope.selectedDate = new Date();
  $scope.getType = function(key) {
     return Object.prototype.toString.call($scope[key]);
   };

   $scope.clearDates = function() {
     $scope.selectedDate = null;
   };
}]);
