var request = require('request');
var personal = require('./personal.js');
var fs = require('fs');
var arg = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var option = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',                              //Added UA to header
      'Authorization': 'token ' + personal.GITHUB_TOKEN     //Added token that is saved on personal.js
    }
  }

  request(option, function(err, response, body) {
    cb(err, body);
    var body = JSON.parse(body);                                     //Reading each of the url in data

    body.forEach(function(element) {                                 //Getting url data and login data
      var loginName = element.login;                                 //This will be used for jpg file name
      var avaURL = element.avatar_url;
      downloadImageByURL(avaURL, './avatars/' + loginName + '.jpg'); //Saves the image to pathfile
    })
  });
}

function downloadImageByURL (url, pathfile) {                        //Function for getting images
  request.get(url)
         .pipe(fs.createWriteStream(pathfile))
};

getRepoContributors(arg[0], arg[1], function(err, result) {
  console.log("Errors:", err);
});



