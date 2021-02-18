const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults
db.defaults({ posts: [] }).write();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/posts", function (request, response) {
  response.sendFile(path.join(__dirname, "posts", "index.html"));
});

app.get("/api/posts", function (req, res) {
  const posts = db.get("posts");
  res.json(posts);
});

app.get("/posts/:id", function (request, response) {
  const posts = db.get("posts");
  const id = request.params.id;
  const post = posts[id];
  response.send(post);
});

app.post("/posts", function (request, response) {
  // request.body -> { post: 'Hello Class' }
  const post = {
    body: request.body,
    submitted: new Date().toString(),
  };
  console.log("Creating post: ", post);
  db.get("posts").push(post).write();

  response.statusCode = 200;
  response.redirect("/posts");
});

app.listen(process.env.PORT ?? "8000", function () {
  console.log("listening at " + process.env.PORT ?? "8000");
});
