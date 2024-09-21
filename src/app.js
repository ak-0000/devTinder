const express = require("express");
const { authadmin, authuser } = require("./middleware/auth");
const app = express();

// to handle error
// we can use try and catch
// also we can use at the end of the code app.use("/" , (err , req , res , next)

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
app.use("/", (req, res) => {
  throw new Error("dhinkachika");
  // When an error is thrown (like throw new Error()), Express immediately stops the regular flow and looks for error-handling middleware to handle the error. It skips any regular route handlers that come after the error is thrown.
// Regular route handlers that haven’t been executed yet will be bypassed, and Express will go straight to the nearest error-handling middleware.
  // res.send("data is the new oil");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(401).send("error is found ");  //error-handling middleware
  }
  // res.send("data is loading");
});
// app.use("/admin" , authadmin);

// app.get("/admin/getdata" , (req, res) => {
//   res.send("there is the data ");
// });

// // app.use("/user" , authuser);

// app.get("/user/data", authuser , (req , res) => {
//   res.send("user name is elon musk");
// })

app.listen(3000, () => {
  console.log("server is listenting ");
});
