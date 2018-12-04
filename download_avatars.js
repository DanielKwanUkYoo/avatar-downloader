var request = require('request');
var personal = require('./personal.js')

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var option = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',             //added UA to header
      'Authorization': 'token ' + personal.GITHUB_TOKEN
    }
  }

  request(option, function(err, response, body) {
    cb(err, body);

    var body = JSON.parse(body);
    body.forEach(function(element) {
      console.log(element.avatar_url);
    })

  });
}


//cb for checking errors
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

});


