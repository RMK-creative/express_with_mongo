const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/student");
const app = express();
const PORT = 3010;

require("dotenv").config();

const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB);

app.get("/", (req, res) => {
  Student.find({}, (err, data) => res.send(data));
});

app.post("/", (req, res) => {
  Student.create({
    name: "Rachael",
    first_name: "Kunz",
    email: "r@kunz.com",
  }).then(function (newStudent) {
    res.send(newStudent);
  });
});

app.put("/", (req, res) => {
  Student.updateMany(
    { first_name: "Bob" },
    { $set: { first_name: "John" } }
  ).then(function (updateStudent) {
    res.send(updateStudent);
  });
});

app.delete("/:name", (req, res) => {
  Student.deleteOne({ name: req.params.name }).then(function () {
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
