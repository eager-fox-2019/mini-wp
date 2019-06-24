const { verify } = require("../helpers/jwt");
const userM = require("../models/userModel");
const articleM = require("../models/articleModel");

module.exports = {
  authentication: function(req, res, next) {
    let token = req.headers.token;

    if (token) {
      let decode = verify(token);

      userM
        .findOne({
          email: decode.email
        })
        .then(found => {
          if (found) {
            req.logedUser = decode;
            req.user = found;
            next();
          } else {
            throw { code: 401, message: `Unauthenticate` };
          }
        })
        .catch(next);
    } else {
      throw { code: 401, message: `Unauthenticated. ` };
    }
  },
  authorization: function(req, res, next) {
    let userId = req.logedUser.id;

    articleM
      .findById(req.params.id)
      .then(data => {
        if (data) {
          if (userId === data.userId) {
            next();
          } else {
            throw {
              code: 401,
              message: "Unauthorized"
            };
          }
        } else {
          throw {
            code: 404,
            message: "Not Foound. "
          };
        }
      })
      .catch(next);
  }
};
