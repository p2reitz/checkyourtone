'use strict';

app.directive('switch', function(){
  return {
    templateUrl: '../views/templates/switch.html',
  };
});

app.directive('waitingForResults', function(){
  return {
    templateUrl: '../views/templates/waitingForResults.html',
  };
});

app.directive('reCheck', function(){
  return {
    templateUrl: '../views/templates/reCheck.html',
  };
});
