const bcrypt = require('bcryptjs');

module.exports = function(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}