//Here we will verify the token to do the particular action

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    //this will verify our token and gives a decoded value
    const token = req.headers.Authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    console.log("reached");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  //if the auth is successfull else return an error
};
