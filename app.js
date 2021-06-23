const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const {
  errorHandler,
  routeNotFound,
  unauthorised,
} = require("./error-handler/index");

// DB connection
const { initiateDbConnection } = require("./db/database-connection");
initiateDbConnection();

// bring in routes
const postRoutes = require("./routes/post.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

// unauthorised user error handler middleware
app.use(unauthorised);

// error handler middleware, which should be at last
app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server connected");
});
