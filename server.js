//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon

//declare variables
const express = require("express");
const app = express();
const PORT = 8500;
const mongoose = require("mongoose");
const TodoTask = require("./models/todotask");
require("dotenv").config();

//set middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

// GET METHOD
app.get("/", async (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      res.render("index.ejs", { todotasks: tasks });
    });
  } catch (err) {
    if (err) return res.status(500).send(err);
  }
});

//POST METHOD
app.post("/", async (req, res) => {
  const todoTask = new TodoTask({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await todoTask.save();
    console.log(todoTask);
    res.redirect("/");
  } catch (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
