angular.module('MyApp')
  .factory('auth', ['$http', '$location', '$alert','$window', 'token',
    function($http, $location, $alert, $window, token) {
        return {
        login: function(user) {
          return $http.post('/users/login', user)
            .success(function(data) {
              token.saveToken(data.token);
              $location.path('/profile');
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
          return $http.post('/users/signup', user)
            .success(function(data, status, headers, config) {
              $location.path('/profile');
              token.saveToken(data.token);
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
          return $http.get('/users/logout').success(function() {
            $location.path('/');
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
