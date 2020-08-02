const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("../functions/permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-recipe-api.firebaseio.com",
});

const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: true,
  })
);

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
