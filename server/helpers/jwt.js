const jwt = require("jsonwebtoken");

module.exports = {
  sign: function(val) {
    let token = jwt.sign(val, process.env.JWT_SECRET);
    return token;
  },
  verify: function(val) {
    let verified = jwt.verify(val, process.env.JWT_SECRET);

    if (verified) {
      return verified;
    } else {
      return {
        code: 401,
        message: "Unauthenticated"
      };
    }
  }
};
