const Food = require("../models/food");
const mongoose = require("mongoose");

exports.foods_get_all = (req, res, next) => {
  //Model.find() is an instance of mongoose query which enables to find the data in the given format and it is not a promise but a thenable so to make it a promise we use .exec()
  Food.find()
    .select("name price _id img")
    .exec()
    .then((doc) => {
      const response = {
        count: doc.length,
        products: doc.map((data) => {
          return {
            name: data.name,
            price: data.price,
            id: data._id,
            img: data.img,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.create_food = (req, res, next) => {
  const food = new Food({
    _id: new mongoose.Types.ObjectId(), //to give a new id
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
  });
  //saving the food item
  food
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created food successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          img: result.img,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_food = (req, res, next) => {
  const id = req.params.foodId; //getting the food ID from the request link
  Food.findById(id)
    .select("name price _id img")
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          food: data,
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for the given ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update_food = (req, res, next) => {
  const id = req.params.foodId;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  //$set is not an arbitrary thing its use in the mongoose and then we pass the object of key value pairs we want to update
  //alternatively we can pass the updateOps instead of req.body with as a value for $set
  //{$set : updateOps}
  //the thing is it wont add new properties to the current data but req.body can do so

  //to update using $set pass aan array of key value pairs
  // [
  //   {"propName": "valu"}
  // ]

  Food.updateOne({ _id: id }, req.body)
    .exec()
    .then((doc) => {
      res.status(200).json({ message: "product updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_food = (req, res, next) => {
  const id = req.params.foodId;

  Food.deleteOne({ _id: id })
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
