angular.module('MyApp')
  .factory('transactions', ['$http', 'token', function($http, token) {
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
        //And alert - possibly in controller
      })
    };
    o.remove = function(transaction){
      return $http.delete('/transactions/'+transaction._id+"/users/"+token.currentUserId(), {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        var index = o.transactions.indexOf(transaction);
        o.transactions.splice(index,1);
      })
    }
    return o;
  }]);
