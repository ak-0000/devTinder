const express = require("express");
const app = express();
const User = require("./models/user");
const { connectdb } = require("./config/database");
const cookieParser = require("cookie-parser");

// to take the dynamic data from the user/postman
// we use the express.json() middleware
app.use(express.json()); // this works for all the routes , all of then , it just convert the json data given by the user in postman to js obj .
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// to use this routes 

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);




connectdb().then(() => {
  console.log("database is connected successfully");
  app.listen(3000, () => {
    console.log("Server listening at 3000 ... ");
  });
});
