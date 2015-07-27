angular.module('MyApp')
.controller('ProfileCtrl', [
        '$scope','transactions','token','SweetAlert','bitcoinPrice',
        function($scope,transactions,token,SweetAlert,bitcoinPrice) {

    $scope.transactions = transactions.transactions;

    $scope.sortType = 'date';
    $scope.sortReverse = false;
    //search yet to be implemented
    $scope.searchTransactions = '';

    $scope.price = bitcoinPrice.getPrice();
    $scope.amount;
    $scope.buyValue;
    $scope.addTransaction = function(){
      console.log($scope.buyValue);
      transactions.create(token.currentUserId(),{
        amount: $scope.amount,
        buyValue: $scope.buyValue,
        date: $scope.selectedDate
      });
    };

    $scope.selectedDate = new Date();

    $scope.getType = function(key) {
       return Object.prototype.toString.call($scope[key]);
     };

   $scope.clearDates = function() {
     $scope.selectedDate = null;
   };

   $scope.showEditTransaction = false;
   //$scope.transactionToEdit;
   $scope.showAddTransaction=false;
   //change this to just the index
   $scope.editTransaction = function(transaction) {
      $scope.showEditTransaction= !$scope.showEditTransaction;
      $scope.transactionToEdit=transaction;
      $scope.showAddTransaction=false;
   }

   /*$scope.doEditTransaction = function(transaction){
     transactions.edit(token.currentUserId(),{
       amount: $scope.transactionToEdit.amount,
       buyValue: $scope.transactionToEdit.buyValue,
     });
   };*/

   $scope.areYouSure = function(transaction) {
     SweetAlert.swal({
      title: "Are you sure?",
      text: "Your transaction will be romved permanently",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      closeOnConfirm: false,
      closeOnCancel: true
    }, function(isConfirm){
        if (isConfirm) {
          transactions.remove(transaction);
          SweetAlert.swal("Deleted!", "Your transaction has been deleted.", "success");
        }
    });
  };


}]);
