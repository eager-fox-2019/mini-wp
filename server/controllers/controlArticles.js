const Article = require('../models/').Article
const User = require('../models/').User

class ControllerArticle {
	static findAll(req, res, next){
	    // let userEmail = req.decode
	    Article.find()
		.then(articleList => {
			res.json(articleList)
		})
	    .catch(next)
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
		console.log("at update ControllerArticle")
		Article.findOne({_id:req.params.id})//, req.body, {new: true})
		.populate('owner')
		.exec((err, article) => {
			if (err) throw err;
			console.log(article)
			if (article.owner.email == req.decode){
				return Article.update({_id:req.params.id}, req.body, {new:true})
			} else {
				let err = new Error()
				err.status = 403
				err.message = "You are not the author of this article"
				throw err
			}
		})
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
	    Article.create(articleInput)
	      .then(createdArticle => {
	        res.json(createdArticle)
	      })
	      .catch(next)
	}
}

module.exports = ControllerArticle