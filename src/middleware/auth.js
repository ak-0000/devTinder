const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is invalid");
    }
    const decodeobj = await jwt.verify(token, "Dev@tinder123" ); // returs the secret data in the token
    const {_id } = decodeobj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user ;                // attaching user to req.user so that we can use this in other apis
    next();
  } catch (err) {
    res.send("ERROR : " + err.message);
  }
};
module.exports = {
  userAuth,
};