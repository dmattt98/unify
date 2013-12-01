var libs = require(__dirname + '/libraries.json'),    // gets the json file where all libraries are stored
	fs = require('fs');    // gets the filesystem module
	express = require('express'),    // gets the express module
	app = express(),     // creates the express app
	request = require('request'),    // gets the request module
	async = require('async'),    // gets the async module
	save = require('./save.js'),    // gets the save.js  module
	colors = require('colors');    // gets the colors module which is used to add color to the console

save.files(libs, 'latest');    // calls the files function in save.js which saves locally any undownloaded files

app.get('/one/*', function(req, res) {    // express routing to everything in /one/ 

	res.status(200);    // sets the http response code to 200
	res.set('Content-Type', 'application/javascript');    // sets the file type in the header

	console.log('rqst: '.green + 'a request for \'' + req.params[0].yellow + '\' was made');    // logs to the console the url requested

	var requested = req.params[0].split("/"),    // splits the request into individual library names
		urls = [];    // creates an empty url array to be used later

	for(var i = 0; i < requested.length; i++) {  // a for loop to fill the urls array with the urls of the requested libraries
		if(typeof libs[requested[i].replace('.js', '')] !== 'undefined')    // makes sure the library actually exists
			urls.push(libs[requested[i].replace('.js', '')]);
	}

	async.map(urls, , function(error, result) {    // async's map function gets the results from the request.get function and puts it into one array
		var data = '';    // creates a blank string to store all the libraries in
		for(var i = 0; i < result.length; i++) {    // for loop to get the library's code from each json object in the results of async.map
			data += result[i].body + ' ';    // appends the library's code to the datastring
		}
		res.end(data);    // server the browser the appended libraries
	});
});

app.get('/', function(req, res) {
	res.set('Content-Type', 'text/html');
});

app.listen(3000);    // sets the app to listen on port 3000
console.log('info: '.cyan + 'now listening to port 3000');    // logs to the console the port being listen to