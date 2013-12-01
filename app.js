var libs = require(__dirname + '/libraries.json'),    // gets the json file where all libraries are stored
	fs = require('fs');    // gets the filesystem module
	express = require('express'),    // gets express
	app = express(),     // creates the express app
	request = require('request'),    // gets request
	async = require('async');    // gets async

app.get('/one/*', function(req, res) {    // express routing to everything in /one/ 

	res.set('Content-Type', 'application/javascript');    // sets the file type in the header

	console.log('a request for ' + req.params[0] + ' was made');    // logs to the console the url requested

	var requested = req.params[0].split("/"),    // splits the request into individual library names
		urls = [];    // creates an empty url array to be used later

	for(var i = 0; i < requested.length; i++) {  // a for loop to fill the urls array with the urls of the requested libraries
		if(typeof libs[requested[i].replace('.js', '')] !== 'undefined')    // makes sure the library actually exists
			urls.push(libs[requested[i].replace('.js', '')]);
	}

	async.map(urls, request.get, function(error, result) {    // async's map function gets the results from the request.get function and puts it into one array
		var data = '';    // creates a blank string to store all the libraries in
		for(var i = 0; i < result.length; i++) {    // for loop to get the library's code from each json objects in the results of async.map
			data += result[i].body + ' ';    // appends the library's code to the datastring
		}
		res.end(data);    // server the browser the appended libraries
	});
});

app.listen(3000);
console.log('now listening to port 3000');