function errorHandler(err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Error occurred, check the error message for more details",
    errorMessage: err.message,
  });
  next();
}

function routeNotFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: "the route you are looking for could not be found!",
  });
}

module.exports = { errorHandler, routeNotFound };
