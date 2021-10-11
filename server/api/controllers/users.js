const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  //first we check if the user exists and if yes then return from here
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "Email exits",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          //bcrypt is a package that will hash our password to protect from getting misused
          //hashing is a one way operation there is no way to reverse it but yes it can be verified
          // But if some one uses a dictionary table to match your hash with existing one there are chances it gets matched
          //so simple passwords can be found easily
          //so idea of salting is to add a random string in the password so the hash is not found in those dictionaries

          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              address: req.body.address,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                console.log(err),
                  res.status(500).json({
                    error: err,
                  });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      //if we dont get a user
      if (user.length < 1) {
        //we are not sending 404 that is not found because hackers can do bruteforce to find the registered once so we are sending 401 that is unauthorised as status
        res.status(401).json({
          message: "Auth failed",
        });
      }
      //so checking a password by bcrypt compare
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              email: user[0].email,
              name: user[0].name,
              address: user[0].address,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        //Again we are not telling whether auth failed due to email or password
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};

exports.delete_user = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};

exports.update_user = (req, res, next) => {
  User.updateOne({ _id: req.params.userId }, req.body)
    .exec()
    .then((result) => {
      User.find({ _id: req.params.userId })
        .exec()
        .then((user) => {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              email: user[0].email,
              name: user[0].name,
              address: user[0].address,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Address updated",
            token: token,
          });
        });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
};
