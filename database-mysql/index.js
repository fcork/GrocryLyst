var mysql = require('mysql');

var connection = mysql.createConnection({
  user     : 'root',
  password : 'password',
  database : 'groceries'
});

connection.connect();

var getGroceryList = function(callback) {
  let queryString = 'SELECT * FROM groceryItems'
  connection.query(queryString, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addGroceryItem = function(item, callback) {
  let queryString = `INSERT INTO groceryItems VALUES (default, '${item}')`
  connection.query(queryString, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  getGroceryList,
  addGroceryItem
}
