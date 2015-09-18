var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('lodash');

var app = express();

app.set('trust proxy', 1) // trust first proxy

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send("It Works!");
});

app.post('/', function(req, res) {
	if(!req.body.team_domain || !req.body.token || !req.body.user_name || !req.body.text) {
		return res.status(400).json({
			message: "missing parameters"
		});
	}
	var from_id = _.findIndex(config.teams, {
		'name': req.body.team_domain,
		'token': req.body.token
	});
	if(from_id == -1) {
		return res.status(403).json({
			message: "forbidden"
		});
	}
	var to_id = from_id == 0 ? 1 : 0;
	var payload = {
		username: req.body.user_name,
//		icon_url: "",
		channel: "#" + config.teams[to_id].channel,
		text: req.body.text
	}
	var options = {
    url: config.teams[to_id].hook,
    method: 'POST',
		form: JSON.stringify(payload)
  };
  request(options, function(error, response, body) {
		if(!error && response.statusCode == 200) {
	    console.log(req.body.team_domain, req.body.timestamp, 'ok');
			res.json({});
	  } else {
			console.log(req.body.team_domain, req.body.timestamp, body);
			req.status(500).json({
				message: "target hook error"
			});
	  }
	});
});

var server = app.listen(process.env.PORT || 3004, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});