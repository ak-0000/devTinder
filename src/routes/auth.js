// auth path apis

const express = require("express");

const authRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

const { validateSignUpData } = require("../utils/validateSignUpData");

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateSignUpData(req);
    //  encrpyt the password  -> bcrypt
    const { firstName, lastName, emailId, password } = req.body;
    const encrptpassword = await bcrypt.hash(password, 10);

    // const adduser = new User(req.body);   // this is also right but as we know we cannot trust the req.body
    const adduser = new User({
      firstName,
      lastName,
      emailId,
      password: encrptpassword,
    });
    await adduser.save();
    res.send("user has signedup to database");
  } catch (err) {
    res.send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create a JWT token
      const token = await user.getjwt();
      // console.log(token);
      // Add the token to cookie and send the cookie/ response  to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login is successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout" , async(req, res) => {
  res.cookie("token" , null , {expiresIn: new Date(Date.now())});
  res.send("logout is successfull");
}); 


module.exports = authRouter;
