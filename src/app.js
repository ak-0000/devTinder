const express = require("express");

const app = express() ;

// app.use("/user" , (req , res ) => {
//     res.send("this will be used for all types of http api call ");
// })
app.get("/user" , (req , res) => {
    console.log(req.query);
    res.send({Name : "Atul " ,  Age : 19});
});


app.get("/user/:userid" , (req , res) => {
    console.log(req.params);
    res.send({Name : "Atul " ,  Age : 19});
});

app.post("/user" , (req , res ) => {
    res.send("data is added to the database ");
})

app.delete("/user" , (req , res) => {
    res.send("data is deleted from the database ");
})

app.patch("/user" , (req , res ) => {
    res.send("data is updated in the database");
})

// this will match all the http method api calls to /hello 
app.use("/hello" , (req , res) =>{
    res.send("hello theres");
});  

// app.use("/", (req , res) =>{
//     res.send("this is the dashboard");
// });       //this will be used for all the paths starting with / When the "/" or /hello - /hello/1 -> same route 
//  route is matched, it sends a response, which ends the request-response cycle, 
// so none of the other routes are being reached.
// /hello - /hello123 -> does not match 


app.listen(3000 , () => {
    console.log("server is listenting ");
});