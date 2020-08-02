const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

//Routes
app.get("/hello-world", (req, res) => {
  return res.status(200).send("hello world");
});

//Create

//Read

//Update

//Delete

//export app to firebase cloud
exports.app = functions.https.onRequest(app);
