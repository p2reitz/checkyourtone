'use strict';

var app = angular.module('Capstone', ['ngRoute', 'ngSanitize']);


// app.factory('authInterceptor', ['$q', '$window', function ($q, $window) {
//   return {
//     request: function (config) {
//       config.headers = config.headers || {};
//       if($window.sessionStorage.token) {
//         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//       }
//       return config;
//     },
//     response: function (response) {
//       if (response.status === 401) {
//         // handle the case where the user is not authenticated
//           return "Log in not right";
//       }
//       return response || $q.when(response);
//     }
//   };
// }]);
//
// app.config(['$httpProvider', function ($httpProvider) {
//   $httpProvider.interceptors.push('authInterceptor');
// }]);
