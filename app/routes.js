'use strict';

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'./views/home.html',
        controller: 'HomeController as HC'
      })
      .when('/insights', {
        templateUrl: './views/insights.html',
        controller: 'InsightsController as IN'
      })
      .when('/sign_up', {
        templateUrl: './views/sign_up.html',
        controller: 'SignUpController as SUC'
      })
      .when('/sign_in', {
        templateUrl: './views/sign_in.html',
        controller: 'SignInController as SIC'
      })
      .when('/tone', {
        templateUrl: '/views/tone.html',
        controller: 'ToneController as TO'
      })
      .when('/results', {
        templateUrl: '/views/results.html',
        controller: 'ResultsController as RC'
      })
      .when('/newPassword', {
        templateUrl: '/views/newPassword.html',
        controller: 'NewPasswordController as NPC'
      })
      .otherwise('/', {
        templateUrl: './views/home.html',
        controller: 'HomeController as HC'
      });
});
