const articleM = require("../models/articleModel");

class articleController {
  static create(req, res, next) {
    console.log(req.logedUser);
    let createArticle = {
      title: req.body.title,
      userId: req.logedUser.id,
      content: req.body.content,
      cretedAt: Date(),
      author: req.body.username,
      feturedImage: req.file.cloudStoragePublicUrl
    };

    articleM.create(createArticle).then(created => {
      res.json(created);
    });
  }

  static findAll(req, res, next) {
    articleM
      .find()
      .then(allData => {
        res.json(allData);
      })
      .catch(err => {
        res.json(err);
      });
  }
  static findUsers(req, res, next) {
    articleM
      .find({
        author: req.body.author
      })
      .then(usersArticle => {
        res.json(usersArticle);
      })
      .catch(err => {
        res.json(err);
      });
  }
  static findOne(req, res, next) {
    let id = req.body._id;
    articleM
      .findById(id)
      .then(article => {
        res.json(article);
      })
      .catch(err => {
        res.json(err);
      });
  }
  static update(req, res, next) {
    let update = {};
    let id = req.body._id;
    if (req.body.title) {
      update.title = req.body.title;
    }
    if (req.body.content) {
      update.content = req.body.content;
    }
    if (req.body.featuredImage) {
      update.featuredImage = req.body.featuredImage;
    }

    articleM
      .findByIdAndUpdate(id, update, { new: true })
      .then(success => {
        res.json(success);
      })
      .catch(err => {
        res.json(err);
      });
  }
  static delete(req, res, next) {
    let id = req.params.id;
    console.log(id);

    articleM
      .findByIdAndDelete(id)
      .then(deleted => {
        res.json(deleted);
      })
      .then(err => {
        res.json(err);
      });
  }
}

module.exports = articleController;
