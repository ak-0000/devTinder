const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName , emailId , password} = req.body ;

    if(!firstName || firstName.length< 4 || firstName > 50){
        throw new Error("Enter a valid firstName");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Enter a valid email-id");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong Password");
    }
};

module.exports = {
    validateSignUpData , 
}

