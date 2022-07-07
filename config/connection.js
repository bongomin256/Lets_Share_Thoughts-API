const { connect, connection, mongoose } = require("mongoose");

connect(process.env.MONGODB_URI || "mongodb://localhost/letShareThoughtsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);
module.exports = connection;
