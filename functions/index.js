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
app.post("/api/", (req, res) => {
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

      return res.status(200).send("New recipe added");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//Read All
app.get("/api/recipes", (req, res) => {
  (async () => {
    try {
      let doc = db.collection("recipes");
      let response = [];

      await doc.get().then((res) => {
        let recipes = res.docs;
        selectedRecipe(recipes, response);

        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
//Read with id

app.get("/api/recipes/:id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("recipes").doc(req.params.id);
      let recipe = await doc.get();
      let response = recipe.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
//Update

//Delete
// module.exports = app;

//export app to firebase cloud

// helpers

const selectedRecipe = (recipes, response) => {
  recipes.forEach((recipe) => {
    const selectedRecipe = {
      id: recipe.id,
      name: recipe.data().name,
      prepTime: recipe.data().prepTime,
      cookTime: recipe.data().cookTime,
      difficulty: recipe.data().difficulty,
      serves: recipe.data().serves,
      ingredients: recipe.data().ingredients,
      description: recipe.data().description,
      steps: recipe.data().steps,
      type: recipe.data().type,
    };
    response.push(selectedRecipe);
  });
  return response;
};

exports.app = functions.https.onRequest(app);
