const route = require("express").Router();
const userR = require("../routes/userRoutes");
const articleR = require("./articleRoute");

route.use("/users", userR);
route.use("/articles", articleR);

route.get("/*", (req, res) => {
  console.log("berhasil masuk routers");
  res.send("loh lolos semua");
});

module.exports = route;
