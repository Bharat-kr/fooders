const express = require("express");
const router = express.Router();
const checkauth = require("../middleware/checkauth");
const foodController = require("../controllers/foods");

router.get("/", foodController.foods_get_all);

router.post("/", checkauth, foodController.create_food);

router.get("/:foodId", foodController.get_food);

router.patch("/:foodId", checkauth, foodController.update_food);

router.delete("/:foodId", checkauth, foodController.delete_food);

module.exports = router;
