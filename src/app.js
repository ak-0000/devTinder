const express = require("express");
const {authadmin, authuser} = require("./middleware/auth")
const app = express();

// get user => chain of middleware ==> request handler 

// app.use("/user " , [rh1 , rh2 ], rh3 );  // maintaining multiple round handlers 
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("1 response");              //middleware 
//     next(); 
//     // res.send("1 is working");
//   },
//   (req, res, next) => {
//       next() ; 
//     // res.send("2 is working");
//   } 
//   ,
//   (req , res , next) => {
//     res.send("3 is working ");                 //request handler 
//   }
// );

app.use("/admin" , authadmin);

app.get("/admin/getdata" , (req, res) => {
  res.send("there is the data ");
});

// app.use("/user" , authuser);

app.get("/user/data", authuser , (req , res) => {
  res.send("user name is elon musk");
})


app.listen(3000, () => {
  console.log("server is listenting ");
});
