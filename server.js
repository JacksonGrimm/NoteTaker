const express = require("express");
const data = require("./db/db.json");

const PORT = 3001;
const app = express();

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(data);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
