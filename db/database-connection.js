const mongoose = require("mongoose");

const initiateDbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("DB CONNECTION SUCCESSFUL!"));
  mongoose.connection.on("error", (err) => {
    console.log(`DB CONNECTION ERROR: ${err.message}`);
  });
};

module.exports = { initiateDbConnection };
