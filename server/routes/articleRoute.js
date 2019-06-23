const route = require("express").Router();
const articleC = require("../controller/articleController");
const { authentication, authorization } = require("../middleware/checkAA");
const images = require("../middleware/google-cloud-storage");

route.get("/allArticle", articleC.findAll);

route.use("/", authentication);

route.get("/userArticle", articleC.findUsers);
route.get("/article", articleC.findOne);
route.post(
  "/article",
  images.multer.single("image"),
  images.sendUploadToGCS,
  articleC.create
);
route.patch("/article", articleC.update);
route.delete("/article/:id", authorization, articleC.delete);

route.post("/*", (req, res) => {
  res.json("ededededededehhh");
});
module.exports = route;
