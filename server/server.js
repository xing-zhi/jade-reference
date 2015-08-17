'use strict';

const path = require('path');

const express = require('express');

const app = express();

const tocItems = ['attributes', 'case', 'code', 'comments', 'conditionals', 'doctype', 'extends', 'filters', 'includes', 'interpolation', 'iteration', 'mixins', 'plain text', 'tags'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', {items: tocItems});
});

app.listen(3000);

console.log('http://localhost:3000');
