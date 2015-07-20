angular.module('MyApp')
.controller('ProfileCtrl', [
        '$scope','transactions','token','SweetAlert',
        function($scope,transactions,token,SweetAlert) {

    $scope.transactions = transactions.transactions;

    $scope.sortType = 'date';
    $scope.sortReverse = false;
    $scope.searchTransactions = '';

    $scope.addTransaction = function(){
      transactions.create(token.currentUserId(),{
        amount: $scope.amount,
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

   $scope.areYouSure = function(id) {
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
          console.log(id);
          transactions.delete(id);
          SweetAlert.swal("Deleted!", "Your transaction has been deleted.", "success");
        }
    });
  }
}]);
