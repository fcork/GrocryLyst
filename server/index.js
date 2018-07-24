var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/list', function (req, res) {
  db.getGroceryList(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      console.log(data)
      res.send(data);
    }
  });
});

app.post('/list', function (req, res){
  console.log('item: ', req.body.params.item)
  let item = req.body.params.item;
  db.addGroceryItem(item, function(err, data) {
    if (err) {
      console.log('server post list error: ', err)
      res.status(500)
    } else {
      res.send('success posting list!')
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

