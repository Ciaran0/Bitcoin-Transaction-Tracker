angular.module('MyApp')
  .factory('transactions' ['$http', 'auth', function($http, auth) {
    var o = {
      transactions: []
    };
    o.getAllForUser = function(user) {
      return $http.get('transactions/users/'+user._id, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        angular.copy(data, o.transactions);
        //And alert - possibly in controller
      });
    };
    o.create = function(user){
      return $http.post('/transactions/users/'+user._id, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        o.transactions.push(data);
      })
    }


    return o;

  }])
