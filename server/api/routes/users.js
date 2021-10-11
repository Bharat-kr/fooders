const express = require("express");
const router = express.Router();
const checkauth = require("../middleware/checkauth");
const usersController = require("../controllers/users");

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);
router.patch("/:userId", usersController.update_user);

router.delete("/:userId",  usersController.delete_user);

module.exports = router;
