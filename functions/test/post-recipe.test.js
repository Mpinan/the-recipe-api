const request = require("supertest");
const app = require("../routes/hello-world");

xdescribe("Post recipe", () => {
  let recipe;

  beforeEach(() => {
    recipe = {
      name: "Paella",
      prepTime: "60 min",
      cookTime: "60 min",
      difficulty: "medium",
      serves: "6",
      ingredients:
        "10gr olive oil\n1 onion\n3 gloves of garlick\n1 5gr paprika\n300g paella rice\n250g chopped/sheddred tomatoes\n900ml fish stock or chicken stock\n400g mixed seafood",
      description: "Typical Spanish dish.",
      steps: {
        1: "Heat olive oil in a paella pan. Add the mixed seafood to give oil a nice fish flavour and half cooked the seafood, after removed seafood from pan",
        2: "Add 1 finely chopped onion and 3 gloves of garlick and soften for 5 mins.",
        3: "Once onion is golden, add paprika and stir to prevent paprika of burning, after a few seconds, add the tomatoes",
        4: "Once the water of the tomatoes has evaporated add the rice to and make sure all rice is wet with the tomatoes.",
        5: "Add the seafood and then put the stock. Preferably boiling stock.",
        6: "Once boiling, do not stir so the rice at the buttom can golden and create socarrat, which is the typical crispy rice that Spanish people enjoy the most",
        7: "5 min before finish, add king prawns and slices of lemon on top of the rice, switch the heat off and cover with a clothe or silver paper.",
      },
      type: "main",
    };
  });

  it("should create a new recipe", async () => {
    const res = await request(app).post("/api/create").send({
      recipe,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe(recipe);
  });
});
