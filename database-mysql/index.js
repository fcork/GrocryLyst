var mysql = require('mysql');

var connection = mysql.createConnection({
  user     : 'root',
  password : 'password',
  database : 'groceries'
});

connection.connect();

var getGroceryList = function(list_id, callback) {
  let queryString = `SELECT * FROM groceryItems where list_id=${list_id}`
  connection.query(queryString, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addGroceryItem = function(item, list_id, callback) {
  let queryString = `INSERT INTO groceryItems VALUES (default, '${item}', ${list_id})`
  connection.query(queryString, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results)
    }
  })
}

var deleteGroceryItem = function(item, callback) {
  let queryString = `DELETE FROM groceryItems WHERE food='${ item }'`
  connection.query(queryString, function(err, results) {
    if (err) {
      callback (err, null)
    } else {
      callback(null, results)
    }
  })
}

var addGroceryList = function(list, callback) {
  let queryString = `INSERT INTO groceryLists VALUES (default, '${ list }')`
  connection.query(queryString, (err, results) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

var getLists = function(callback) {
  let queryString = `SELECT * FROM groceryLists`
  connection.query(queryString, (err, results) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  getGroceryList,
  addGroceryItem, 
  deleteGroceryItem,
  addGroceryList,
  getLists
}
