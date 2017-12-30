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

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/home.html'));
});

// set the home page route
app.get('/*', function(req, res) {
	var r = req.params[0];
	var contains = false;
	for (num in links) {
		var l = links[num]
		if (l.original_url == r) {
			res.send(l);
			contains = true;
		} else if (num == r) {
			res.writeHead(301,
			{Location: l.original_url}
			);
			res.end();
			contains = true;
		}
	}
	if (!contains) {
		var rand = getNum();
		links[rand] = {"original_url": r, "short_url": "https://obscure-island-90192.herokuapp.com/" + rand};
		res.send(links[rand]);
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