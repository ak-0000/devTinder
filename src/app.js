const express = require("express");
const app = express();

const { connectdb } = require("./config/database");

const User = require("./models/user");

// to take the dynamic data from the user/postman
// we use the express.json() middleware
app.use(express.json()); // this works for all the routes , all of then , it just convert the json data given by the user in postman to js obj .
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const adduser = new User(req.body);
  await adduser.save();
  // const userdata = {
  //   firstName: "tony",
  //   lastName: "stark",
  //   emailId: "avengerhubro@gmail.com",
  //   password: 7,
  // };
  // // adding the user data in a instance of user model
  // const adduser = new User(userdata);
  // await adduser.save(); //data is saved to our database
  // res.send("user is added to the db");
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  // console.log(userEmail);
  try {
    const getuser = await User.find({ emailId: userEmail });
    console.log(getuser);
  } catch (err) {
    req.status(404).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feeddata = await User.find({});
    console.log(feeddata);
  } catch (err) {
    req.status(404).send("Something went Crazy");
  }
});

app.delete("/user", async (req, res) => {
  const useremailId = req.body.emailId;
  try {
    const deleteduser = await User.deleteOne({ emailId: useremailId });
    res.send("user has been deleted from the db");
  } catch (err) {
    req.status(404).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userid = req.params?.userId ;
  const data = req.body;
  try {
    if(data.skills.length > 10 ){
      throw new Error("skills can't be more than 10 ")
    }
    //writing logic to have data more secure  
    const ALLOWED_UPDATES = ["userid", "firstName", "about", "skills"];
    const isAllowedUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("Update is not allowed");
    }
    const updateuser = await User.findByIdAndUpdate(userid, data, {
      new : true,
      runValidators: true,
    });
    // const updateuser =  await User.updateOne({_id : userid} , {lastName : "The Great Superdstar"});
    // to use the rules of schema in already putted data when update

    res.send("user has been updated on the db");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

connectdb().then(() => {
  console.log("database is connected successfully");
  app.listen(3000, () => {
    console.log("Server listening at 3000 ... ");
  });
});
