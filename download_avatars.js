var request = require('request');
var personal = require('./personal.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var option = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',                              //added UA to header
      'Authorization': 'token ' + personal.GITHUB_TOKEN     //added token that is saved on personal.js
    }
  }

  request(option, function(err, response, body) {
    cb(err, body);
    var body = JSON.parse(body);                                     //reading each of the url in data

    body.forEach(function(element) {                                 //getting url data and login data
      var loginName = element.login;
      var avaURL = element.avatar_url;
      downloadImageByURL(avaURL, './avatars/' + loginName + '.jpg'); //saves the image to pathfile
    })

  });
}


//cb for checking errors/run
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

});

function downloadImageByURL (url, pathfile) {                        //function for getting images
  request.get(url)
         .pipe(fs.createWriteStream(pathfile))
}

