const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName || firstName.length < 4 || firstName > 50) {
    throw new Error("Enter a valid firstName");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email-id");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong Password");
  }
};

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "skills ",
    "about",
    "firstName",
    "lastName",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfile,
};
