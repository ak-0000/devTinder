// create a user schema

const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {  // only run when new user is created 
      if (!["male", "female ", "others"].includes(value)) {
        throw new Error("Gender data is not valid ");
      }
    },
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "this is the default about of the user",
  },
  skills: {
    type: [String],
  },
} , {
    timestamps : true ,
});

module.exports = mongoose.model("User", userSchema);
