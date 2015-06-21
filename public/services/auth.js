angular.module('MyApp')
  .factory('Auth', ['$http', '$location', '$alert','$window',
    function($http, $location, $alert, $window) {
      var auth = {};
      auth.saveToken = function (token){
        console.log("saving token!!");
        $window.localStorage['bitTracker-token'] = token;
      };
      auth.getToken = function (){
        return $window.localStorage['bitTracker-token'];
      }
      auth.isLoggedIn = function(){
       var token = auth.getToken();

         if(token){
           var payload = JSON.parse($window.atob(token.split('.')[1]));

           return payload.exp > Date.now() / 1000;
         } else {
           return false;
         }
       };
       auth.currentUser = function(){
       if(auth.isLoggedIn()){
         var token = auth.getToken();
         var payload = JSON.parse($window.atob(token.split('.')[1]));

         return payload.username;
       }
     }
        return {
        login: function(user) {
          return $http.post('/api/login', user)
            .success(function(data) {
              auth.saveToken(data.token);
              $location.path('/');
              $alert({
                title: 'Cheers!',
                content: 'You have successfully logged in.',
                placement: 'top-right',
                type: 'success',
                duration: 3
              });
            })
            .error(function() {
              $alert({
                title: 'Error!',
                content: 'Invalid username or password.',
                placement: 'top-right',
                type: 'danger',
                duration: 3
              });
            });
        },
        signup: function(user) {
          return $http.post('/api/signup', user)
            .success(function(data, status, headers, config) {
              $location.path('/login');
              console.log(data.token);
              auth.saveToken(data.token);
              $alert({
                title: 'Congratulations!',
                content: 'Your account has been created.',
                placement: 'top-right',
                type: 'success',
                duration: 3
              });
            })
            .error(function(response) {
              $alert({
                title: 'Error!',
                content: response.data,
                placement: 'top-right',
                type: 'danger',
                duration: 3
              });
            });
        },
        logout: function() {
          return $http.get('/api/logout').success(function() {
            $window.localStorage.removeItem('bitTracker-token');
            $alert({
              content: 'You have been logged out.',
              placement: 'top-right',
              type: 'info',
              duration: 3
            });
          });
        }
      };
    }]);
