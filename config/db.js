// var express = require('express');
var mysql = require('mysql');
// var router = express();

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'webphim',
});

// db.connect(function (err) {
//     if (err) throw err;
//     console.log('Database conneced.');

// });
db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});

module.exports = db