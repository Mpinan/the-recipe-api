const app = require("../index");

app.get("/hello-world", (req, res) => {
  return res.status(200).send("hello world");
});

module.exports = app;
