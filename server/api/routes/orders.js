const express = require("express");
const router = express.Router();
const checkauth = require("../middleware/checkauth");
const ordersController = require("../controllers/orders");

router.get("/", checkauth, ordersController.orders_get_all);

//here we first check if the given food is present then only make a order else return a 404
router.post("/", ordersController.create_order);

router.get("/:userId", ordersController.get_order_by_user);

router.patch("/:orderId", ordersController.update_order);

router.delete("/:orderId", ordersController.delete_order);

router.get("/:orderId", checkauth, (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("food")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not Found",
        });
      }
      res.status(200).json({
        order: order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
