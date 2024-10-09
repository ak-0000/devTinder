// create a user schema
const validator = require("validator");
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid Email-address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      required : true , 
      validate(value) {
        // only run when new user is created
        if (!["male", "female ", "others"].includes(value)) {
          throw new Error("Gender data is not valid ");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a valid url");
        }
      },
    },
    about: {
      type: String,
      default: "this is the default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({firstName : 1 , lastName : 1 });

userSchema.methods.getjwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@tinder123", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordhash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordhash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
