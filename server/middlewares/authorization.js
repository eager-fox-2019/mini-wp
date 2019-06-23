const Article = require('../models/articles')

module.exports = (req, res, next)  => {
  Article.findOne({
      _id : req.params.id
  }).exec()
  .then(foundArticle => {
      if(!foundArticle){
          throw ({code : 404 , msg : 'resource not found'})
      }else{
          if(foundArticle.user == req.decode.id){
              next()
          }else{
              throw ({code : 401 , msg : 'not authorized'})
          }
      }
  })
  .catch(next)
}