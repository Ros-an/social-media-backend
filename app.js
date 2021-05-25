const express = require("express");
const app = express(); //now express app is ready to used

// to handle request we send response

app.get("/", (req, res) => {
  res.send("Hello ! this is my social media app with nodemon!!");
});

//server will listen to this port
app.listen(8080, () => {
  console.log("server connected");
});
