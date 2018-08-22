'use strict';

const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

module.exports = app;
