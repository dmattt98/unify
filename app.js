var libs = require(__dirname + '/libraries.json'),    // get json file where all libraries are stored
	express = require('express'),    // requires express
	app = express();    // creates an express object

app.get('/one/*', function(req, res) {    // used to get requests to /one/*

	console.log('a request for ' + req.params[0] + ' was made');    // logs the request to the console

	var requested = req.params[0].split("/"),    // splits the request into individual library names
		urls = '';    // creates a variable to be use to store the library locations

	for(var i = 0; i < requested.length; i++) {    // for loop to add the library url to urls separated by <br> tags
		urls += (libs[requested[i]] + '<br>');
	}

	res.send(urls);    // sends the url string to the browser
});

app.listen(3000);    // sets express to listen on port 3000
console.log('now listening to port 3000');    // logs that we are listen on port 3000