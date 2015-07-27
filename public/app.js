angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap','oitozero.ngSweetAlert','ngSanitize'])
  .config(['$locationProvider','$routeProvider','$modalProvider', function($locationProvider, $routeProvider,$modalProvider) {
    $locationProvider.html5Mode(true);
    angular.extend($modalProvider.defaults, {
      html: true
    });
    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .when('/faq', {
      templateUrl: 'views/faq.html',
      controller: 'FaqCtrl'
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
        transactionPromise: ['transactions', function(transactions){
          return transactions.getAllForUser();
        }],
        pricePromise: ['bitcoinPrice', function(price){
          return price.getPrice();
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  }
]);
