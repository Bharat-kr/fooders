const mongoose = require("mongoose");
const food = require("../models/food");
const Order = require("../models/order");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("food quantity _id status user review")
    .populate("food", "name") // populate is used to fet the details of the model we already made and we can pass values that we want like i did
    .exec()
    .then((doc) => {
      res.status(200).json({
        count: doc.length,
        orders: doc.map((order) => {
          return {
            _id: order._id,
            user: order.user,
            food: order.food,
            quantity: order.quantity,
            status: order.status,
            review: order.review,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.create_order = (req, res, next) => {
  Order.find({ user: req.body.user, food: req.body.foodId, status: false })
    .then((order) => {
      if (order.length > 0) {
        res.status(204).json({ message: "order exists" });
      } else {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          user: req.body.user,
          quantity: req.body.quantity,
          food: req.body.foodId,
        });
        return order.save();
      }
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  // food
  //   .findById(req.body.foodId)
  //   .then((food) => {
  //     if (!food) {
  //       res.status(404).json({
  //         message: "Product not found",
  //       });
  //     }
  //     const order = new Order({
  //       _id: new mongoose.Types.ObjectId(),
  //       user: req.body.user,
  //       quantity: req.body.quantity,
  //       food: req.body.foodId,
  //     });
  //     return order.save();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     res.status(201).json({
  //       message: "Order stored",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });

  //Queries(like : find and delete) are thenable so they give a then but no catch so to make it a proper promise we put exec() but save() is a proper promise so we dont need it
};

exports.get_order_by_user = (req, res, next) => {
  Order.find({ user: req.params.userId })
    .populate("food")
    .exec()
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(404).json({
          message: "No Orders Yet",
        });
      }
      res.status(200).json({
        order: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.updateOne({ _id: id }, req.body)
    .exec()
    .then((doc) => {
      res.status(200).json({ message: "order updated", id: id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
