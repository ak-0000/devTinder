const express = require("express");
const app = express();
const User = require("./models/user");
const { connectdb } = require("./config/database");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validateSignUpData");



// to take the dynamic data from the user/postman
// we use the express.json() middleware
app.use(express.json()); // this works for all the routes , all of then , it just convert the json data given by the user in postman to js obj .
app.post("/signup", async (req, res) => { 
  try{
    // validate the data 
    validateSignUpData(req);
    //  encrpyt the password  -> bcrypt
    const {firstName , lastName , emailId , password} = req.body ;
    const encrptpassword = await bcrypt.hash(password , 10);
    
    // const adduser = new User(req.body);   // this is also right but as we know we cannot trust the req.body 
    const adduser = new User({
      firstName , 
      lastName , 
      emailId ,
      password : encrptpassword ,
    });
    await adduser.save();
    res.send("user has signedup to database")
  }
  catch(err){
    res.send("ERROR :" + err.message);
  }
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
