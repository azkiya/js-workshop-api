const express = require('express');
const bodyParser = require('body-parser');

const apiV1 = require('./api/v1');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8080;
const apis = [
  {
    version: 'v1',
    app: apiV1,
  },
];

app.get('/', (req, res) => {
  res.json({
    hello: 'world'
  });
});

apis.forEach((api) => {
  app.use(`/api/${api.version}`, api.app);
});

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}!`)
});