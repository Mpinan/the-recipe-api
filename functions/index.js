const functions = require("firebase-functions");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-recipe-api.firebaseio.com",
});

const express = require("express");
const app = express();
const db = admin.firestore();
const cors = require("cors");

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
  cors({
    origin: true,
  })
);

//Routes
app.get("/hello-world", (req, res) => {
  return res.status(200).send("hello world");
});

//User Routes

//Get user
app.get("/users/:id", (req, res) => {
  (async () => {
    try {
      console.log(req.params.id, "----");
      const user = admin
        .auth()
        .getUser(req.params.id)
        .then((user) => {
          console.log(user.toJSON(), "----");
          return res.status(200).send(user);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//Create user
app.post("/users/new", (req, res) => {
  (async () => {
    try {
      const auth = admin.auth();
      auth.createUser({
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).send("Added new user");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//Delete user
app.delete("/users/delete/:id", (req, res) => {
  (async () => {
    try {
      const user = admin
        .auth()
        .deleteUser(req.params.id)
        .then((res) => {
          return res.status(200).send("User deleted");
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// app.post("/users/delete/:id", (req, res) => {});

//Create
app.post("/recipes/create", (req, res) => {
  (async () => {
    try {
      await db
        .collection("recipes")
        .doc("/" + req.body.id + "/")
        .create({
          uid: req.body.uid,
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
app.get("/recipes", (req, res) => {
  (async () => {
    try {
      let doc = db.collection("recipes");
      let response = [];

      await doc.get().then((res) => {
        let recipes = res.docs;
        selectRecipes(recipes, response);

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

app.get("/recipes/:id", (req, res) => {
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

app.put("/update/recipe/:id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("recipes").doc(req.params.id);
      await doc.update({
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

      return res.status(200).send("recipe updated");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//Delete
// app.delete("/api/delete/:id", (req, res) => {
//   (async () => {
//     try {
//       const doc = db.collection("recipes").doc(req.params.id);
//       await doc.delete();

//       return res.status(200).send("recipe updated");
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })();
// });
// module.exports = app;

//export app to firebase cloud

// helpers

const selectUsers = (users, response) => {
  users.forEach((user) => {
    const selectedUser = {
      id: user.id,
      email: user.data().email,
    };
    response.push(selectedUser);
  });
  return response;
};

const selectRecipes = (recipes, response) => {
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
