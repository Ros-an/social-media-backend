const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL!"));
mongoose.connection.on("error", (err) => {
  console.log(`DB CONNECTION ERROR: ${err.message}`);
});
// bring in routes
const postRoutes = require("./routes/post.route");

// middleware
app.use(morgan("dev"));
app.use(postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server connected");
});
