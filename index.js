const express = require('express');
const bodyParser = require('body-parser');
const db = require('./files/db');
const routes = require('./files/routes');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});