const authadmin = (req , res , next) => {
    console.log("checking the auth");
    const token = "zxc";
    const checkingtoken = token === "secret";
    if(!checkingtoken){
        res.status(401).send("you are not a admin ");
    }
    else{
        next();
    }
}
const authuser = (req , res , next) => {
    console.log("checking the auth");
    const token = "secret";
    const checkingtoken = token === "secret";
    if(!checkingtoken){
        res.status(401).send("you are not a user ");
    }
    else{
        next();
    }
}

module.exports = {
    authadmin,
    authuser,
}