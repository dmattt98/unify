var libs = require(__dirname + '/libraries.json'),    // gets the json file where all libraries are stored
	fs = require('fs');    // gets the filesystem module
	express = require('express'),    // gets the express module
	app = express(),     // creates the express app
	request = require('request'),    // gets the request module
	async = require('async'),    // gets the async module
	save = require('./save.js'),    // gets the save.js  module
	colors = require('colors');    // gets the colors module which is used to add color to the console

save.files(libs);    // calls the files function in save.js which saves locally any undownloaded files

app.get('/one/*', function(req, res) {    // express routing to everything in /one/ 

	res.status(200);    // sets the http response code to 200
	res.set('Content-Type', 'application/javascript');    // sets the file type in the header

	console.log('rqst: '.green + 'a request for \'' + req.params[0].yellow + '\' was made');    // logs to the console the url requested

	var requested = req.params[0].split("/"),    // splits the request into individual library names
		libraries = [],    // empty arrays to store future information in
		versions = [],
		paths = [];

	for(var i = 0; i < requested.length; i++) {  // a for loop to fill the urls array with the urls of the requested libraries
		if(typeof requested[i].replace('.js', '').split('-')[0] !== 'undefined') {    // makes sure the library actually exists
			var rqst = requested[i].replace('.js', '').split('-');
			libraries.push(rqst[0]);
			if(typeof rqst[1] != 'undefined')
				versions.push(rqst[1]);
			else
				versions.push('latest');
		}
	}

	for(var i = 0; i < libraries.length; i++) {    // creates the file path for the library
		paths.push('./libraries/' + libraries[i] + '/' + versions[i] + '.js');
	}

	async.map(paths, fs.readFile, function(error, result) {    // async's map function gets the results from the fs.readFile function and puts it into one array
		res.end(result.join('').replace(/\r?\n|\r/g, ' '));   // server the browser the appended libraries
	});
});

app.get('/', function(req, res) {
	res.set('Content-Type', 'text/html');
});

app.listen(3000);    // sets the app to listen on port 3000
console.log('info: '.cyan + 'now listening to port 3000');    // logs to the console the port being listen to