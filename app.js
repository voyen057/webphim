var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();
var homeRouter = require('./router/home.js');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// var fileUpload = require('express-fileupload');
// app.use(fileUpload);
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'components')));
app.use('/', homeRouter);
app.listen('9999', () => {
    console.log('Server Started at port 9999, http://127.0.0.1:9999');
});