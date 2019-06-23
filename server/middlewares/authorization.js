const jwt = require('../helpers/jwt')
const Article = require('../models/Article')


function authorization(req, res, next){
    console.log(req.params.id);
    
    let decodeToken = jwt.decode(req.headers.token)
    console.log(decodeToken.id, "id user");
    Article.findById(req.params.id)    
    .then((gotData)=>{
        if(gotData){
            console.log(gotData.UserId ," got id user");
            if(gotData.UserId == decodeToken.id){
                next()
            } else {
                throw {code : 401, message : "Unauthorized"}
            }
        } else {
        }
    })
    .catch(next)
}

module.exports = authorization