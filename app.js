const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const lists = ["Cook Food", "Buy Food", "Eat Food"];
const workitems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  var day = date.getDate();
  res.render('list', {
    kindOfDay: day,
    newListItems: lists
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    kindOfDay: "Work",
    newListItems: workitems
  });
});

app.post("/", function(req, res) {
  var list = req.body.newItem;
  var work = req.body.button;
  if (work === "Work") {
    workitems.push(list);
    res.redirect("/work");
  } else {
    lists.push(list);
    res.redirect("/");
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is Up and Running on 3000");
});
