const bcrypt = require('bcryptjs');

module.exports = function(password) {
    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}