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
  next();
}

function unauthorised(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      success: false,
      message: "Unauthorised User!",
      errorMessage: err.message,
    });
  }
  next();
}

module.exports = { errorHandler, routeNotFound, unauthorised };
