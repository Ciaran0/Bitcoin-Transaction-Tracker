angular.module('MyApp')
  .factory('bitcoinPrice', ['$http',  function($http) {
      var price = {};
      price.data = {};

      price.getPrice = function() {
        $http.get('https://api.bitcoinaverage.com/all').success(function(data){
          console.log(data.EUR.averages.last);
          price.data = data.EUR.averages.last;
        });
        return price.data;
      };
      console.log(price)
  return price;

}]);
