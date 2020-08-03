const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("../functions/permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-recipe-api.firebaseio.com",
});

const express = require("express");
const app = express();
const db = admin.firestore();

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
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db
        .collection("recipes")
        .doc("/" + req.body.id + "/")
        .create({
          name: req.body.name,
          prepTime: req.body.prepTime,
          cookTime: req.body.cookTime,
          difficulty: req.body.difficulty,
          serves: req.body.serves,
          ingredients: req.body.ingredients,
          description: req.body.description,
          steps: req.body.steps,
          type: req.body.type,
        });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
//Read

//Update

//Delete
// module.exports = app;

//export app to firebase cloud
exports.app = functions.https.onRequest(app);
