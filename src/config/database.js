// to connect to database we will use mongooose
// standard of building nodejs database

const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://atul:5tHW7hQ3hpe!DP$@hellomongodb.rimbh.mongodb.net/devTinder"
  );
};
// returns a promise and tell if connection is succesfull or not

module.exports = {
    connectdb,
}