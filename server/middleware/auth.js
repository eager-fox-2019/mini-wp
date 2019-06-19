const User = require('../models/').User
const Article = require('../models/').Article
const verifyToken = require('../helpers/jwt.js').verifyToken

const authentication = (req, res, next) => {
	let token = req.headers.access_token
	if(token) {
		// console.log(token)
		try{
			let decode = verifyToken(token).input
			if(decode){
				req.decode = decode
				next()
			} else {
				//wrong token
				next({status: 403}) //forbidden
			}
		} catch (e){
			next({status: 400})
		}
	} else {
		//no token
		next({status: 403}) //forbidden
	}
}

//authorization article doang
const authArticle = (req, res, next) => {
	let articleId = req.params.id

	if (articleId){
		Article.findOne({_id: articleId})
			.then(found => {
				if (!found) {
					throw ({status: 404}) //article not found
				} else if (found.owner == req.decode.id){
					//token's data matches userId params sent
					next()
				} else {
					//wrong user
					throw ({status:401}) //unauthorized
				}
			})
			.catch(next)
	} else {
		//no article id parameters
		next({status: 404}) //page not found
	}
}

//authorization user doang
const authUser = (req, res, next) => {
	let userId = req.params.id

	if (userId){
		User.findOne({_id: userId})
			.then(found => {
				if (!found) {
					throw ({status: 404}) //article not found
				} else if (found._id == req.decode.id){
					//token's data matches userId params sent
					next()
				} else {
					//wrong user
					throw ({status:401}) //unauthorized
				}
			})
			.catch(next)
	} else {
		//no article id parameters
		next({status: 404}) //page not found
	}
}

module.exports = {
	authentication: authentication,
	authArticle: authArticle,
	authUser: authUser
}