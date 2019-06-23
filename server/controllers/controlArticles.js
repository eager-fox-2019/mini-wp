const Article = require('../models/').Article
const User = require('../models/').User

class ControllerArticle {
	static findAll(req, res, next){
	    Article.find()
	    .populate('owner')
		.exec((err, articleList) => {
			if (err) next(err);
			res.json(articleList);
		})
	}

	static findOne(req, res, next){
	    let articleId = req.params.id
	    Article.findOne({_id: articleId})
		.then(article => {
			res.json(article)
		})
		.catch(next)
	}

	static read(req, res, next){
		Article.findOne({_id: req.params.id})
		.then(article => {
			//http://api.voicerss.org/?key=<API key>&hl=en-us&src=Hello, world!
			let readStr = article.title+". "+article.content.replace(/<[^>]*>?/gm, '')
			let link = `https://api.voicerss.org?key=${process.env.VOICE_API}&hl=en-us&src=${readStr}`
			res.json([process.env.VOICE_API, readStr])
		})
		.catch(next)
	}

	static update(req, res, next){
		Article.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
		.then(updated => {
			res.json(updated)
		})
		.catch(next)
	}

	static delete(req, res, next){
		Article.findOneAndDelete({_id:req.params.id})
		.then(deleted => {
			res.json(deleted)
		})
		.catch(next)
	}

	static create(req, res, next){
	    let articleInput = req.body //should have title and content
	    articleInput.owner = req.decode.id //add owner id

	    //convert image to a google cloud url
	    let articleImage = req.body.featured_image

	    Article.create(articleInput)
	      .then(createdArticle => {
	        res.json(createdArticle)
	      })
	      .catch(next)
	}

	static uploadImage(req, res, next){
	  console.log("uploadimage at ControllerArticle")
      try {
      	console.log(req.body)
      	console.log(req.file)
		if (req.file && req.file.gcsUrl) {
			return res.send(req.file.gcsUrl);
		}

      } catch (err){
      	console.log(err)
  		return res.send(err)
      }
      // return res.status(500).send('Unable to upload');
    }
}

module.exports = ControllerArticle