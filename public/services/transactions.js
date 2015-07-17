angular.module('MyApp')
  .factory('transactions', ['$http', 'token', function($http, token) {
    var o = {
      transactions: []
    };
    o.getAllForUser = function(user) {
      return $http.get('transactions/users/'+token.currentUserId(), {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        angular.copy(data.transactions, o.transactions);
        console.log(o.transactions);
        //And alert - possibly in controller
      });
    };
    o.create = function(id,transaction){
      return $http.post('/transactions/users/'+id, transaction, {
        headers: {Authorization: 'Bearer '+token.getToken()}
      }).success(function(data){
        o.transactions.push(data);
      })
    };
    return o;
  }]);
