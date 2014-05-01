'use strict';

var express      = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash        = require('..');

var app = express();

app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(flash());

app.get('/', function(req, res) {
	req.flash('message', 'index');
	res.redirect('/flash');
});

app.get('/multiple', function(req, res) {
	req.flash('successMessage', 'a message about success');
	req.flash('errorMessage', 'a message about failure');
	res.redirect('/flash');
});

app.get('/stack', function(req, res) {
	req.flash('successMessage', 'a message about success');
	req.flash('successMessage', 'a second message');
	res.redirect('/flash');
});

app.get('/flash', function(req, res) {
	var messages = req.flash();
	res.send(messages);
});

module.exports = app;