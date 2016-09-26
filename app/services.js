'use strict';

app.service('hostURL', [function() {
    var sv = this;
    var development = false;
    sv.getURL = function() {
        if (development === true) {
            return "http://localhost:3000";
        } else {
            return "https://philip-capstone.herokuapp.com";
        }
    };
}]);


app.service('getService', ['$http', 'hostURL', function($http, hostURL) {
    var sv = this;
    sv.posts = [];

    sv.insights = function(text) {
        //console.log(text);
        $http.post(hostURL.getURL() + '/insights', {
                text: text
            })
            .then(function(data) {
                sv.posts.splice(0, sv.posts.length);
                for (var i = 0; i < data.data.tree.children.length; i++) {
                    sv.posts.push(data.data.tree.children[i]);
                }
                console.log('sv.posts: ', sv.posts);
            })
            .catch(function(err) {
                console.log(err);
            });
    };
}]);


app.service('toneService', ['$http', 'hostURL', '$location', function($http, hostURL, $location) {
    var sv = this;


    sv.watson = {
        value: {}
    };
    sv.sentences = [];
    //sv.scores = [];
    sv.tones = {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0,
        analytical: 0,
        confident: 0,
        tentative: 0,
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        emotionalrange: 0
    };
    // sv.docTone = {
    //     value: false
    // };
    sv.result = {
        value: false
    };

    sv.tone = function(text) {
        sv.result.value = true;
        //console.log(text);
        sv.email = text;
        $http.post(hostURL.getURL() + '/tone', {
                text: text
            })
            .then(function(data) {
                sv.tones.anger = data.data.document_tone.tone_categories[0].tones[0].score;
                sv.tones.disgust = data.data.document_tone.tone_categories[0].tones[1].score;
                sv.tones.fear = data.data.document_tone.tone_categories[0].tones[2].score;
                sv.tones.joy = data.data.document_tone.tone_categories[0].tones[3].score;
                sv.tones.sadness = data.data.document_tone.tone_categories[0].tones[4].score;
                sv.tones.analytical = data.data.document_tone.tone_categories[1].tones[0].score;
                sv.tones.confident = data.data.document_tone.tone_categories[1].tones[1].score;
                sv.tones.tentative = data.data.document_tone.tone_categories[1].tones[2].score;
                sv.tones.openness = data.data.document_tone.tone_categories[2].tones[0].score;
                sv.tones.conscientiousness = data.data.document_tone.tone_categories[2].tones[1].score;
                sv.tones.extraversion = data.data.document_tone.tone_categories[2].tones[2].score;
                sv.tones.agreeableness = data.data.document_tone.tone_categories[2].tones[3].score;
                sv.tones.emotionalrange = data.data.document_tone.tone_categories[2].tones[4].score;

                //console.log('sv.sentences.length: ', sv.sentences.length);
                sv.sentences.splice(0, sv.sentences.length);
                //console.log('data.data.sentences_tone.length: ', data.data.sentences_tone.length);
                for (var i = 0; i < data.data.sentences_tone.length; i++) {
                    sv.sentences.push(data.data.sentences_tone[i]);
                }

                sv.result.value = false;

                sv.watson.value = data.data;
                //console.log('data.data: ', data.data);
                //sv.email.value = text;
                //console.log('text: ', text);
                $location.path('/results');
            })
            .catch(function(err) {
                console.log(err);
            });
    };




}]);


app.service('resultsService', ['toneService', function(toneService) {
    var sv = this;

    sv.switchButton = {
        value: false
    };

    sv.tones = toneService.tones;

    sv.email = toneService.email;

    sv.sentences = toneService.sentences;

    sv.watson = toneService.watson;

    sv.scores = [];

    sv.bgcolor = {
        value: 1
    };
    sv.newEmailOne = {
        value: ''
    };
    sv.newEmailTwo = {
        value: []
    };
    sv.newEmailThree = {
        value: ''
    };
    sv.changedEmail = {
        value: true
    };
    sv.changedEmailOne = {
        value: false
    };
    sv.changedEmailTwo = {
        value: false
    };
    sv.newEmail = {
        value: []
    };
    sv.newEmailOne = {
        value: []
    };
    sv.guageName = {
        value: 'Anger'
    };

    sv.findWord = function(word, email) {
        console.log('word: ', word);
        console.log('email: ', email);
        sv.savedWord = word;
        var newWord = word.toString();
        var splitEmail = email.replace(/[\r\n]/g, ' ');
        //console.log(splitEmail);
        var splitEmailTwo = splitEmail.replace(/[\(\)]/g, '');
        //console.log(splitEmailTwo);
        //var splitEmailThree = splitEmail;
        var splitEmailThree = splitEmailTwo.split(' ');
        console.log('splitEmailThree: ', splitEmailThree);
        for (var i = 0; i < splitEmailThree.length; i++) {
            console.log(word);
            if (newWord === splitEmailThree[i] || newWord.toLowerCase() === splitEmailThree[i]) {
                sv.newEmail.value.push('<span style="color:red;">' + splitEmailThree[i] + '</span>');
            } else {
                sv.newEmail.value.push(splitEmailThree[i]);
            }
        }
        sv.newEmailOne.value = sv.newEmail.value.toString().replace(/[\,]/g, ' ');
        sv.changedEmail.value = false;
        sv.changedEmailOne.value = true;
        sv.switchButton.value = true;
        console.log('sv.newEmailOne.value: ', sv.newEmailOne.value.toString());
    };

    sv.toneSelector = function(one, two, three, four) {
        sv.guageName.value = four.toString();
        sv.bgcolor.value = three;
        console.log('sv.bgcolor: ', sv.bgcolor);
        console.log(one, two);
        console.log('sv.watson.value: ', sv.watson.value);
        sv.scores.splice(0, sv.scores.length);
        for (var i = 0; i < sv.watson.value.sentences_tone.length; i++) {
            if (sv.watson.value.sentences_tone[i].tone_categories.length === 0) {
                sv.scores.push({
                    'score': 0
                });
            } else {
                sv.scores.push(sv.watson.value.sentences_tone[i].tone_categories[one].tones[two]);
            }
        }
        console.log('sv.scores: ', sv.scores);
    };

    sv.switchWords = function(email, replace) {
        var newWord = sv.savedWord;
        var splitEmail = email.replace(/[\r\n]/g, ' ');
        var splitEmailTwo = splitEmail.replace(/[\(\)]/g, '');
        var splitEmailThree = splitEmailTwo.split(' ');
        for (var i = 0; i < splitEmailThree.length; i++) {
            if (newWord === splitEmailThree[i] || newWord.toLowerCase() === splitEmailThree[i]) {
                sv.newEmailTwo.value.push(replace);
            } else {
                sv.newEmailTwo.value.push(splitEmailThree[i]);
            }
        }
        sv.newEmailThree.value = sv.newEmailTwo.value.toString().replace(/[\,]/g, ' ');
        sv.switchButton.value = false;
        sv.changedEmailOne.value = false;
        sv.changedEmailTwo.value = true;
    };

}]);

app.service('signUpService', ['$http', 'hostURL', '$window', '$location', function($http, hostURL, $window, $location) {
    var sv = this;

    sv.signUp = function(first_name, last_name, email, password, password2) {
        if (password === password2) {
            $http.post(hostURL.getURL() + '/signup', {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password
                })
                .then(function(response) {
                    if (response.data === 'taken') {
                        alert('that email is already taken.');
                    } else {
                        $window.localStorage.token = response.data.token;
                        $location.path('/tone');
                    }
                })
                .catch(function(err) {
                    console.log('error: ', err);
                });
        } else {
            alert("Your passwords did not match.");
        }
    };
}]);


app.service('signInService', ['$http', 'hostURL', '$window', '$location', function($http, hostURL, $window, $location) {
    var sv = this;

    sv.signIn = function(email, password) {
        console.log('email, password: ', email, password);
        $http.post(hostURL.getURL() + '/signIn', {
                email: email,
                password: password
            })
            .then(function(response) {
                console.log('response: ', response);
                $window.localStorage.token = response.data.token;
                $location.path('/tone');
            })
            .catch(function(err) {
                console.log('error: ', err);
            });
    };
}]);
