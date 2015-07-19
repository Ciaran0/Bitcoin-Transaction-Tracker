angular.module('MyApp')
  .factory('bitcoinPrice', ['$http',  function($http) {
      var price = {
        usd:0
      };
      price.getPrice = function() {
        $http.get('https://api.bitcoinaverage.com/all').success(function(data){
          price.usd = data.USD.averages.last;
          console.log(data.USD.averages.last);
          console.log(price.usd);
        });
        return price;
      };
  return price;

}]);
