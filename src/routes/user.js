const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName, lastname, photoUrl , age, skills";

// get all the pending request for the loggedin user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Eroor : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const connectionRequest = await ConnectionRequest.find({
    $or: [
      { toUserId: loggedInUser._id, status: "accepted" },
      { fromUserId: loggedInUser._id, status: "accepted" },
    ],
  })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

  const data = connectionRequest.map((row) => {
    if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });

  res.json({ data });
});
module.exports = userRouter;
