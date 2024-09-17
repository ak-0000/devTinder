const express = require("express");

const app = express() ;

// app.use("/", (req , res) =>{
//     res.send("this is the dashboard");
// })       this will be used for all the paths starting with / When the "/"
//  route is matched, it sends a response, which ends the request-response cycle, 
// so none of the other routes are being reached.

app.use("/test" , (req , res) => {
    res.send("res is send ");
})

app.use("/hello" , (req , res) =>{
    res.send("hello theres");
})  

app.listen(3000 , () => {
    console.log("server is listenting ");
});