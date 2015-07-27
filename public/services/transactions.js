angular.module('MyApp')
  .factory('transactions', ['$http', 'token','$alert', function($http, token,$alert) {
    var o = {
      transactions: []
    };
    o.getAllForUser = function(user) {
      return $http.get('transactions/users/'+token.currentUserId(), {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        angular.copy(data, o.transactions);
      });
    };
    o.create = function(id,transaction){
      return $http.post('/transactions/users/'+id, transaction, {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        o.transactions.push(data);
        $alert({
          title: 'Added!',
          content: 'You have added a transaction',
          placement: 'top-right',
          type: 'success',
          duration: 3
        });
      });
    };
    o.edit = function(id,transaction){
      return $http.put('/transactions/'+id, transaction, {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        $alert({
          title: 'Edited!',
          content: 'You have edited your transaction',
          placement: 'top-right',
          type: 'success',
          duration: 3
        });
      });
    };
    o.remove = function(transaction){
      return $http.delete('/transactions/'+transaction._id+"/users/"+token.currentUserId(), {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        var index = o.transactions.indexOf(transaction);
        o.transactions.splice(index,1);
        $alert({
          title: 'Deleted!',
          content: 'You have deleted your transaction.',
          placement: 'top-right',
          type: 'success',
          duration: 3
        });
      });
    };
    return o;
  }]);
