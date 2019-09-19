const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const todoRouter = require('./routes/todo');

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
