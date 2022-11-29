const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");

const PORT = 3001;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readFromFile = util.promisify(fs.readFile);
//random id
const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  noteData = {
    title,
    text,
    id: uuid(),
  };

  //read the DB file
  let array = [];
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    if (!error) {
      array = JSON.parse(data);
      array.push(noteData);
      console.log(array);
      fs.writeFile("./db/db.json", JSON.stringify(array), function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    } else {
      console.log(error);
    }
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
