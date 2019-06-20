const Article = require(`../models/article`);

class ControllerArticle {
  // POST /articles
  static create(req, res, next) {
    Article.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  // DELETE /articles
  static delete(req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(next);
  }

  // GET /articles/:id
  static detail(req, res, next) {
    Article.findById(req.params.id)
      .populate("author")
      .populate("tags")
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(400).json({ message: `that is not exists` });
        }
      })
      .catch(next);
  }

  // GET /articles
  static all(req, res, next) {
    Article.find({ status: "posted" })
      .populate("author")
      .populate("tags")
      .then(founds => {
        if (founds.length >= 1) {
          let asc = founds.sort((a, b) => {
            return a.createdAt - b.createdAt;
          });
          if (req.query.sort === "desc") {
            res.status(200).json(asc.reverse());
          } else {
            res.status(200).json(asc);
          }
        } else {
          res.status(200).json(founds);
        }
      })
      .catch(next);
  }

  // GET /articles/user
  static user(req, res, next) {
    Article.find({ author: req.user._id })
      .populate("tags")
      .populate("author")
      .then(founds => {
        if (founds.length >= 1) {
          let asc = founds.sort((a, b) => {
            return a.createdAt - b.createdAt;
          });
          if (req.query.sort === "desc") {
            res.status(200).json(asc.reverse());
          } else {
            res.status(200).json(asc);
          }
        } else {
          res.status(200).json(founds);
        }
      })
      .catch(next);
  }

  // PATCH /articles/:id
  static update(req, res, next) {
    Article.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
  }

  // PATCH /articles/likes/:id
  static updatelikes(req, res, next) {
    Article.findById(req.params.id)
      .then(found => {
        let likedby = found.likedby;
        let index = likedby.indexOf(req.user._id);
        if (index === -1) {
          // kalau belum di like, maka like
          likedby.push(req.user._id);
        } else {
          // kalau udah di like, maka unlike
          likedby.splice(index, 1);
        }
        return Article.findByIdAndUpdate(req.params.id, founds);
      })
      .then(article => {
        res.status(200).json(updated);
      })
      .catch(next);
  }
}

module.exports = ControllerArticle;


