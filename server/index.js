var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database-mysql');
// var items = require('../database-mongo');
// var socket = require('socket.io')


var app = express();
// var server = require('http').createServer(app)
// var io = require('socket.io')(server)
app.use(bodyParser.json());

const port = process.env.PORT || 3000
var server = app.listen(port, () => {console.log('Listening on port ' + port)})
var io = require('socket.io').listen(server);

// server.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + '/../react-client/dist'));




// var io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('made socket connection')

  socket.on('update list', (data) => {
    console.log('used socket!')
    console.log('changed list to: ', data)
    io.emit('update list', data)
  })

  // socket.on('change list', (data) => {
  //   console.log('used socket for change list')
  //   io.emit('change list', data)
  // })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})


app.get('/grocery', function (req, res) {
  console.log('get query id: ', req.query.list_id)
  let list_id = req.query.list_id
  db.getGroceryList(list_id, (err, data) => {
    if(err) {
      res.status(500);
    } else {
      console.log('get list datat: ', data)
      res.send(data);
    }
  });
});

app.post('/grocery', function (req, res) {
  console.log('item: ', req.body.params.item)
  console.log('item: ', req.body.params.list_id)
  let list_id = req.body.params.list_id;
  let item = req.body.params.item;
  db.addGroceryItem(item, list_id, function(err, data) {
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

app.post('/list', function(req, res) {
  console.log('post list name: ', req.body.params.list)
  let list = req.body.params.list
  db.addGroceryList(list, (err, data) => {
    if (err) {
      res.status(500)
      console.log(err)
    } else {
      res.send('successfully posted list')
    }
  })
})

app.get('/list', function(req, res) {
  db.getLists((err, data) => {
    if (err) {
      res.status(500)
      console.log(err)
    } else {
      console.log('get list data: ', data)
      res.send(data)
    }
  })
})

// app.listen(3000, function() {
//   console.log('listening on port 3000!');
// });

