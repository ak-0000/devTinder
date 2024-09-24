const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send("connection is sent by :" + user.firstName);
});

module.exports = requestRouter;
