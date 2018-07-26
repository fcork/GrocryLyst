var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');
// var items = require('../database-mongo');
// var socket = require('socket.io')


var app = express();
var server = require('http').createServer(app)
var io = require('socket.io')(server)
app.use(bodyParser.json());

server.listen(3000)

app.use(express.static(__dirname + '/../react-client/dist'));




// var io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('made socket connection')

  socket.on('send list', (data) => {
    console.log('used socket!')
    console.log('changed list to: ', data)
    io.emit('update list', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/list', function (req, res) {
  db.getGroceryList(function(err, data) {
    if(err) {
      res.status(500);
    } else {
      console.log('get list datat: ', data)
      res.send(data);
    }
  });
});

app.post('/list', function (req, res) {
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

app.post('/delete', function(req, res) {
  console.log('delete item: ', req.body.params.item)
  db.deleteGroceryItem(req.body.params.item, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500)
    } else {
      res.send('successful delete')
    }
  })
})

// var server = app.listen(3000, function() {
//   console.log('listening on port 3000!');
// });

