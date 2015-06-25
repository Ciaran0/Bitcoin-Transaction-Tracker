angular.module('MyApp').controller('ProfileCtrl', [
'$scope', 'transactions',
function($scope, transactions) {
  $scope.transactions = transactions.transactions;
  $scope.addTransaction = function(){
    transaction.create({
      amount: $scope.amount,
      date: $scope.date
    });
  }
  $scope.selectedDate = new Date();
  $scope.getType = function(key) {
     return Object.prototype.toString.call($scope[key]);
   };

   $scope.clearDates = function() {
     $scope.selectedDate = null;
   };
}]);
