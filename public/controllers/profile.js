angular.module('MyApp')
.controller('ProfileCtrl', [
        '$scope','transactions','token','SweetAlert','bitcoinPrice','$modal',
        function($scope,transactions,token,SweetAlert,bitcoinPrice) {

    $scope.transactions = transactions.transactions;

    $scope.sortType = 'date';
    $scope.sortReverse = false;
    $scope.searchTransactions = '';

    $scope.modal = {title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};
    $scope.price = bitcoinPrice.getPrice();

    $scope.addTransaction = function(){
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
          console.log("klkksd"+transaction);
          transactions.remove(transaction);
          SweetAlert.swal("Deleted!", "Your transaction has been deleted.", "success");
        }
    });
  }
}]);
