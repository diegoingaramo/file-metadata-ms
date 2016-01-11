var express = require('express');
var multer  = require('multer');
var app = express();
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.post('/api/fileanalyse', upload.single('userFile'), function (req, res, next) {

  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.file)
  	res.end(JSON.stringify({file: {name: req.file.originalname, mimetype:req.file.mimetype, size:req.file.size}}));
  else
  	res.end(JSON.stringify({file: {name: 'No File', mimetype:'No File', size:'No File'}}));

});

app.get('/', function(request, response) {
  		response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


