var express = require('express');
var path = require('path');
var fileSystem = require('fs');
var multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty();

var app = express();
app.set('port', (process.env.PORT || 5001));
//Getting path pf root directory
var appDir = path.dirname(require.main.filename);
app.use(express.static(appDir + '/download-upload'));


app.get('/', function (req, res) {
  res.sendfile(appDir + '/download-upload/index.html');
});

app.post('/demo/upload', multipartyMiddleware, function(req,res){
  var file = { 'file' :req.files.file, 'slot' : req.body.file.slot};
  res.send(file);
});

app.listen(app.get('port'), function() {
  console.log('Node  ng-upload app is running on port', app.get('port'));
});
