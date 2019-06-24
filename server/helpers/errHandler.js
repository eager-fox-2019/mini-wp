let errHandler = (err, req, res, next) => {
  let code = err.status;
  let message = err.message;
  console.log("==========", err, "=========================");
  res.status(code).json({
    message: message
  });
};

module.exports = errHandler;
