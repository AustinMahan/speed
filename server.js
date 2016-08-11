var express = require('express');
var app = express();
var serv = require('http').Server(app);
var port = process.env.PORT || 2000;

//points the sesrver to the index.html file
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/', express.static(__dirname + '/'));
serv.listen(port);
console.log("Server started.");
