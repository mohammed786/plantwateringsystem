var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// routes will go here
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
