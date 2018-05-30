const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

app.use(require('body-parser').json());

app.use('/', express.static(path.join(__dirname + '/../dist')));
app.use('/dist', express.static(path.join(__dirname + '/../node_modules')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
  const message = err.errors && err.errors[0].message;
  err.message = message || err.message;
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;
