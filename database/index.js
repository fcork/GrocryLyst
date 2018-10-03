var mysql = require('mysql');

var dbURL = require('./config.js');


var connectionPool = mysql.createPool(dbURL);

// connection.connect();

const getGroceryList = function(list_id, callback) {
  let queryString = `SELECT * FROM groceryItems where list_id=${list_id}`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, function(err, results, fields) {
        connection.release()
        if(err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }
  })
  
};

const addGroceryItem = function(item, list_id, callback) {
  let queryString = `INSERT INTO groceryItems VALUES (default, '${item}', ${list_id})`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results)
        }
      })
    }
  })
}

const deleteGroceryItem = function(item, callback) {
  let queryString = `DELETE FROM groceryItems WHERE food='${ item }'`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, function(err, results) {
        if (err) {
          callback (err, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

const addGroceryList = function(list, callback) {
  let queryString = `INSERT INTO groceryLists VALUES (default, '${ list }')`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, (err, results) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

const getLists = function(callback) {
  let queryString = `SELECT * FROM groceryLists`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, (err, results) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

const getUserByEmail = function(email, callback) {
  let queryString = `SELECT * FROM users WHERE email = '${ email }'`;
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, function(err, results, fields) {
        connection.release()
        if(err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }
  })
}

const addUser = function(fullName, email, username, callback) {
  let queryString = `INSERT INTO users (fullName, email, username) Values ('${ fullName }', '${ email }', '${ username }')`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, (err, results) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

const getAllUsers = function(callback) {
  let queryString = `SELECT * FROM users`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, (err, results) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

const addConnection = function(email, listId, callback) {
  let queryString = `UPDATE users SET list_id=${listId} WHERE email='${email}'`
  connectionPool.getConnection((err, connection) => {
    if (err) console.log(err)
    else {
      connection.query(queryString, (err, results) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

module.exports = {
  getGroceryList,
  addGroceryItem, 
  deleteGroceryItem,
  addGroceryList,
  getLists,
  addUser,
  getUserByEmail,
  getAllUsers,
  addConnection
}
