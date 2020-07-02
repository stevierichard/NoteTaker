const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/api/notes", async (req, res) => {
  let data = await readFileAsync("db.json", "utf8");
  data = JSON.parse(data);
  res.json(data);
});

router.post("/api/notes", async (req, res) => {
  let data = await readFileAsync("db.json", "utf8");
  data = JSON.parse(data);

  const newdata = req.body;
  newdata.id = data.length + 1;
  data.push(newdata);

  await writeFileAsync("db.json", JSON.stringify(data, null, 2));
  res.send(data);
});

router.delete("/api/notes/:id", async (req, res) => {
  let data = await readFileAsync("db.json", "utf8");
  data = JSON.parse(data);

  const dataToDelete = req.params.id;
  console.log(data);

  data = data.filter((value, index) => {
    return value.id != dataToDelete;
  });
  console.log(data);
  await writeFileAsync("db.json", JSON.stringify(data, null, 2));
  res.json(data);
});

module.exports = router;
