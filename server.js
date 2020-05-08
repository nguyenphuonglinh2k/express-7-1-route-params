const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [] }).write();

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/todos", function(req, res) {
  var q = req.query.q;

  var matchedItem = db
    .get("todos")
    .filter(item => item.toLowerCase().indexOf(q.toLowerCase()) !== -1);

  res.render("index.pug", {
    lists: matchedItem
  });
});

app.get("/search", function(req, res) {
  res.render("search");
});

app.get("/todos/create", function(req, res) {
  res.render("create");
});

app.post("/todos/create", function(req, res) {
  var item = req.body.todo;
  db.get("todos")
    .push(item)
    .write();
  res.redirect("back");
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index.pug", {
    lists: db.get("todos").value()
  });
});

app.get('/todos/:id/delete', function(req, res) {
  var id = req.param.id;
  var item = db.get('todos').find({ id: id }).value();
  db.get('todos').remove(item).write();
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
