var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;
console.log('listening on port ' + port);
var randNum = [];
for (var i =0; i < 100; i++) {
	randNum.push(i);
}
var links = {};
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/*', function(req, res) {
	var l = req.params[0];
	if (l in links) {
		res.redirect((links[i]["original_url"]);
	} else {
		var rand = getNum();
		links[rand] = {"original_url": l, "short_url": "https://obscure-island-90192.herokuapp.com/" + rand};
	}
});

app.listen(port, function() {
    console.log('Our app is running');
});

function getNum() {
	var rand = Math.floor(Math.random() * randNum.length);
	var a = randNum[rand];
	randNum.splice(rand, 1);
	return a;
}