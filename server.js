var express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

MongoClient.connect('mongodb://localhost/test', function(err, database){
  if (err)
    return console.log(err);
  db = database;
  app.listen(3000, function(){
    console.log('listening on 3000');
  });
});

app.get('/', function(req, res){
  var cursor = db.collection('quotes').find().toArray(function(err, result){
    console.log(result);
    res.render('index.pug', {quotes: result});
  });
});

app.post('/quotes', function(req, res){
  db.collection('quotes').save(req.body, function(err, result){
    if (err)
      return console.log('err');
    console.log('saved to database');
  });
  console.log(req.body);
});
