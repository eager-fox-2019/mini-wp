const Tag = require(`../models/Tag`);

class ControllerTag {
  static create(req, res, next) {
    Tag.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Tag.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(next);
  }

  static detail(req, res, next) {
    Tag.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(400).json({ message: `that is not exists` });
        }
      })
      .catch(next);
  }

  static all(req, res, next) {
    Tag.find()
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static update(req, res, next) {
    Tag.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
  }
}

module.exports = ControllerTag;
