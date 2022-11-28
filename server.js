const express = require("express");
const fs = require("fs");
const data = require("./db/db.json");
const path = require("path");

const PORT = 3001;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(data);
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  noteData = req.body;
  //read the DB file

  fs.appendFile("./db/db.json", JSON.stringify(noteData), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
