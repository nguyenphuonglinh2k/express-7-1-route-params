// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

var lists = [
  'Đi chợ',
  'Nấu cơm',
  'Rửa bát',
  'Học tại CodersX'
];

app.get('/todos', function(req, res) {
  var q = req.query.q;
  
  var matchedItem = lists.filter(item => item.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  
  res.render('index.pug', {
    lists: matchedItem
  });
});

app.get('/search', function(req, res) {
  res.render('search');
});
        
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
