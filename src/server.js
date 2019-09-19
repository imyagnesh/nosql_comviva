const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const todoRouter = require('./routes/todo');

mongoose.connect('mongodb://localhost:27017/todoApp', { useNewUrlParser: true });
// const db = require('./db');

const app = express();

app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use(bodyParser.json({ expose: true }));

const port = process.env.port || '3004';

app.use('/api/todo', todoRouter);

app.use('/api/*', (_, res) => {
  res.status(404).send();
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
