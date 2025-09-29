const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/web.html'));

  app.get('/movies.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/movies.json'));
});
});

app.listen(5000, () => {
  console.log('Server is up on port 5000');
});