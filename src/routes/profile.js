const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

const { validateEditProfile } = require("../utils/validateSignUpData");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // the async(req,res) will run only after userauth next works
  const user = req.user;
  res.send(user);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Updates");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile is updated`,
      data: loggedInUser,
    });
    res.send("Updates are done");
  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, (req, res) => {
  // to be done next time 
});


module.exports = profileRouter;
