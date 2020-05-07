// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/todos', function(req, res) {
  res.render('index.pug', {
    lists: [
      'Đi chợ',
      'Nấu cơm',
      'Rửa bát',
      'Học tại CodersX'
    ]
  });
});

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
