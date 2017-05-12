var express = require('express');
var path = require('path');
var fileSystem = require('fs');
var multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty();

var app = express();
//Getting path pf root directory
var appDir = path.dirname(require.main.filename);
app.use(express.static(appDir + '/download-upload'));


app.get('/', function (req, res) {
  res.sendfile(appDir + '/download-upload/index.html');
});

app.post('/demo/upload', multipartyMiddleware, function(req,res){
  var file = req.files.file;
  res.send(file);
});

app.listen(2099);
console.log('Server running on 2099');
