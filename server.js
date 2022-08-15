const express = require("express");
const app = express();
const ejs = require("ejs");
require("dotenv").config();
const port = 8000;
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { info } = require("console");
const cors = require("cors");
const { response } = require("express");

const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.MONGO_URI;

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json({ limit: "1mb" }));

MongoClient.connect(connectionString).then((client) => {
  console.log("connected to the database");
  const db = client.db("Frostfang-fav-albums");
  const infoCollection = db.collection("albums-list");

  app.get("/", (req, res) => {});

  app.get("/fav-album", (req, res) => {
    infoCollection
      .find()
      .limit(50)
      .toArray()
      .then((data) => {
        res.render("fav-album", { albums: data });
      })
      .catch((error) => console.error(error));
  });

  app.post("/submit-album", urlencodedParser, (req, res) => {
    console.log(req.body);
    let parsedYear = parseInt(req.body.year);
    infoCollection
      .insertOne({
        albumName: req.body.albumName,
        artistName: req.body.artistName,
        year: parsedYear,
        genre: req.body.genre,
      })
      .then((result) => {
        console.log("album added");
        res.redirect("/fav-album");
      });
  });
});

app.use("/public", express.static("public"));
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
