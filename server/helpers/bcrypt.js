const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    hash : function(password){
        let hash = bcrypt.hashSync(password,salt)
        return hash
    },
    compare : function ( input, hashed) {
        let compared = bcrypt.compareSync(input, hashed)
        return compared
    }
}