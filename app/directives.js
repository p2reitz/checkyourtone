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
