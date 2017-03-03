const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: {
    }
  })
});

module.exports = app;