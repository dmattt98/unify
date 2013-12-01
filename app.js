var libs = require(__dirname + '/libraries.json'),    // get json file where all libraries are stored
	express = require('express'),
	app = express(),
	request = require('request');

app.get('/one/*', function(req, res) {

	console.log('a request for ' + req.params[0] + ' was made');

	var requested = req.params[0].split("/"),    // splits the request into individual library names
		urls = '';

	for(var i = 0; i < requested.length; i++) {    // for loop to add the library url to urls separated by <br> tags
		urls += (libs[requested[i]] + '<br>');
	}

	res.send(urls);    // sends the url string to the browser
});

app.listen(3000);
console.log('now listening to port 3000');