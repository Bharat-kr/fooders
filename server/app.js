const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const foodRoutes = require("./api/routes/foods");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

//connecting the database
mongoose
  .connect("mongodb://127.0.0.1:27017/Fooders", {
    useNewUrlParser: true,
  })
  .then(console.log("mongo connected"));

// morgan is logging package for node js this console log the the post get any request made
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS - cross origin Resource sharing
//It is a  security mechanism enforced by the browsers
//In a restfull api the client and server are not on same server so the request will fail due to security reasons
//we can handle this by adding some headers that tell the client browser that okay you can have access to thae api
//And as we want to append the headers to every request so we will pass them first
app.use((req, res, next) => {
  res.header("Access-Control-Allow-origin", "*");
  //the star here is used to give acess to any one but we can control this to one by replacing * by the link of the page you want to gice access like 'http://localhost:3000'

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With , Content-Type, Accept, Authorization"
  );
  //so here we added what type of requests can be made to the api

  if (req.method === "OPTIONS") {
    //browser will always send a options of methods they can call so we need to make an additional method to tell which methods can be called

    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH, GET, DELETE");
    //now these methos are supported by our api
    return res.status(200).json({});
  }
  next();
});

//Routes
app.use("/foods", foodRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

// this is the error handler as if you have reached here you were not able to get the thing you wanted from above
app.use((req, res, next) => {
  const error = new Error("NOT FOUND"); //created a new error
  error.status = 404;
  next(error); //this basically sends the newly made error forward
});

//handling the error we got from the above code or any error that comes the in Application from anywhere
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
