'use strict';

app.controller('InsightsController', ['getService', function(getService){
  var vm = this;
  vm.insights = getService.insights;

}]);

app.controller('HomeController', ['$window', function($window){
  var vm = this;
  vm.logOut = function(){
    delete $window.localStorage.token;
  };
}]);

app.controller('ToneController', ['$http', 'toneService', '$sanitize', function($http, toneService, $sanitize){
  var vm = this;
  vm.tone = toneService.tone;
  vm.watson = toneService.watson;
  //vm.toneObject = toneService.toneObject;
  //vm.docTone = toneService.docTone;
  vm.result = toneService.result;
  vm.tones = toneService.tones;
  vm.sentences = toneService.sentences;
  vm.email = toneService.email;
  //vm.toneSelector = toneService.toneSelector;
  //vm.scores = toneService.scores;
  //vm.bgcolor = toneService.bgcolor;
  //vm.guageName = toneService.guageName;
  //vm.findWord = toneService.findWord;
  //vm.changedEmail = toneService.changedEmail;
  //vm.coloredEmail = toneService.coloredEmail;
  //vm.newEmail = toneService.newEmail;
  //vm.newEmailOne = toneService.newEmailOne;
}]);

app.controller('ResultsController', ['resultsService', 'toneService', '$sanitize', function(resultsService, toneService, $sanitize){
  var vm = this;
  vm.tones = toneService.tones;
  vm.sentences = toneService.sentences;
  vm.newEmailOne = resultsService.newEmailOne;
  vm.newEmail = resultsService.newEmail;
  vm.guageName = resultsService.guageName;
  vm.result = resultsService.result;
  vm.tones = resultsService.tones;
  vm.sentences = resultsService.sentences;
  vm.toneSelector = resultsService.toneSelector;
  vm.scores = resultsService.scores;
  vm.bgcolor = resultsService.bgcolor;
  vm.findWord = resultsService.findWord;
  vm.changedEmail = resultsService.changedEmail;
  vm.changedEmailOne = resultsService.changedEmailOne;
  vm.changedEmailTwo = resultsService.changedEmailTwo;
  vm.coloredEmail = resultsService.coloredEmail;
  vm.emailText = resultsService.emailText;
  vm.email = toneService.email;
  vm.watson = toneService.watson;
  vm.switchButton = resultsService.switchButton;
  vm.savedWord = resultsService.savedWord;
  vm.switchWords = resultsService.switchWords;
  vm.newEmailTwo = resultsService.newEmailTwo;
  vm.newEmailThree = resultsService.newEmailThree;
  vm.scaleColor = resultsService.scaleColor;
  vm.reCheck = resultsService.reCheck;
  vm.tone = toneService.tone;
}]);

app.controller('SignUpController', ['signUpService', function(signUpService){
  var vm = this;
  vm.signUp = signUpService.signUp;

}]);

app.controller('NewPasswordController', [function(newPasswordService){
  var vm = this;
}]);


app.controller('SignInController', ['signInService', function(signInService){
  var vm = this;
  vm.signIn = signInService.signIn;

}]);

app.controller('controller',['$http','$window',function($http, $window){
  var vm = this;

  vm.sessionStorage = $window.sessionStorage;

  vm.auth = function(user, password){
    $http.post('http://localhost:3000/authenticate',{username:user, password:password})
    .then(function(response){
      console.log(response);
      $window.sessionStorage.token = response.data.token;
      vm.message = "Logged in successful";

    })
    .catch(function(err){
      console.log(err);
      delete $window.sessionStorage.token;
      vm.message = "Log in unsuccessful";
    });
  };

  vm.logout = function(){
    delete $window.sessionStorage.token;
    vm.message = "Log out successful";
  };

  vm.restricted = function(){
    $http.get('http://localhost:3000/api/restricted')
    .then(function (response) {
      console.log(response);
      vm.restrictedMessage = response.data.first_name + " " + response.data.last_name;
    })
    .catch(function(err){
      vm.restrictedMessage = err.statusText + ": " + err.data.message;
    });
  };
}]);
