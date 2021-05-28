const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { v4: uuid } = require("uuid");
console.log(uuid());
const app = express();
dotenv.config();

// DB connection
const { initiateDbConnection } = require("./db/database-connection");
initiateDbConnection();
// bring in routes
const postRoutes = require("./routes/post.route");

const { errorHandler, routeNotFound } = require("./error-handler/index");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/", postRoutes);

// error handler middleware, which should be at last
app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server connected");
});
