const Post = require('../models/post')

class PostController {
  static create(req, res, next) {
    let exclude = ['user', 'image_url', '_id', '__v', 'createdAt', 'updatedAt']
    let obj = { user: req.decoded._id, image_url: req.file.cloudStoragePublicUrl }
    if(req.body.tags && typeof req.body.tags == 'string')
      req.body.tags = req.body.tags.split(',')
    Post.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.body[path])
          obj[path] = req.body[path]
      }
    })

    Post.create(obj)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static read(req, res, next) {
    console.log(req.query);
    if(req.query.starred == 'true')
      req.query.starred = true
    else if(req.query.starred == 'false')
      req.query.starred = false
    let obj = {}
    let sortBy = {}
    if (req.query.title) obj.title = { '$regex': req.query.title, '$options': 'i' }
    if (req.query.sortBy) sortBy[req.query.sortBy] = -1
    if(req.query.tags){
      req.query.tags = req.query.tags.split(',')
      if(typeof req.query.tags == 'string')
        obj.tags = { $all: [req.query.tags] }
      else
        obj.tags = { $all: req.query.tags }
    }
    if(req.query.starred) obj.starred = req.query.starred
    console.log(JSON.stringify(obj,null,2));
    
    Post.find(obj)
      .sort(sortBy)
      .then(posts => {
        let tags = []
        posts.forEach(obj =>{
          obj.tags.forEach(tag =>{
            if(!tags.includes(tag))
              tags.push(tag)
          })
        })
        // console.log(posts);
        
        res.json({posts,tags})
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Post.findById(req.params.id)
      .then(post => {
        res.json(post)
      })
      .catch(next)
  }

  static update(req, res, next) {    
    let obj = {}
    let exclude = ['user', 'image_url', '_id', '__v', 'createdAt', 'updatedAt']
    if(req.body.tags && typeof req.body.tags == 'string')
      req.body.tags = req.body.tags.split(',')
    if (req.file) {
      obj.image_url = req.file.cloudStoragePublicUrl
    }

    if (req.method === "PATCH") {
      Post.schema.eachPath(path => {
        if (!exclude.includes(path)) {
          if (req.body[path])
            obj[path] = req.body[path]
        }
      })
    }
    else {
      Post.schema.eachPath(path => {
        if (!exclude.includes(path)) {
          obj[path] = req.body[path]
        }
      })
    }

    Post.findByIdAndUpdate(req.params.id, obj, { new: true })
      .then(row => {
        res.json(row)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Post.findByIdAndDelete(req.params.id)
      .then(row => {
        res.json(row)
      })
      .catch(next)
  }
}

module.exports = PostController