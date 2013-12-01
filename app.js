var libs = require(__dirname + '/libraries.json'),    // get json file where all libraries are stored
	express = require('express'),
	app = express(),
	request = require('request'),
	mime = require('mime');

app.get('/one/*', function(req, res) {

	console.log('a request for ' + req.params[0] + ' was made');

	var requested = req.params[0].split("/"),    // splits the request into individual library names
		urls = '';

	for(var i = 0; i < requested.length; i++) {    // for loop to add the library url to urls separated by <br> tags
		if (typeof libs[requested[i].replace('.js', '')] !== 'undefined')    // checks to make sure the library is listed
			urls += (libs[requested[i].replace('.js', '')] + ' ');
	}

	res.status(200);
	res.format({
		'application/javascript': function() {
			res.send(urls);
		}
	});
	console.log(res.get('Content-Type'));
	res.end();
});

app.listen(3000);
console.log('now listening to port 3000');