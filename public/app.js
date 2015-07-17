angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    })
    .when('/profile' , {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        token: 'token',
        load: function($q, $location, token) {
          var deferred = $q.defer();
          deferred.resolve();
          if (!token.isLoggedIn()) {
             $location.path('/login');
          }
          return deferred.promise;
        },
        postPromise: ['transactions', function(transactions){
          return transactions.getAllForUser();
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  }]);
