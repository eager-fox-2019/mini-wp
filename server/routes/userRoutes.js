const route = require("express").Router();
const userController = require("../controller/userController");

route.post("/register", userController.register);
route.post("/login/google", userController.loginGoogle);
route.post("/login", userController.login);

route.post("/*", (req, res) => {
  console.log("di user routes tapi gagal semeua");
});

module.exports = route;
