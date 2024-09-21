const express = require("express");
const app = express();

const { connectdb } = require("./config/database");

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userdata = {
    firstName: "tony",
    lastName: "stark",
    emailId: "avengerhubro@gmail.com",
    password: 7,
  };
  // adding the user data in a instance of user model
  const adduser = new User(userdata);
  await adduser.save();  //data is saved to our database 
  res.send("user is added to the db");
});

connectdb().then(() => {
  console.log("database is connected successfully");
  app.listen(3000, () => {
    console.log("Server listening at 3000 ... ");
  });
});
