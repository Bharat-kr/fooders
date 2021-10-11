const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: String, required: true },
  //so here we are making a relation
  //in ref we put the name of the model we want to connect with this model
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, default: 1 }, // so you pass nothing the default value will be set to 1
  status: { type: Boolean, default: false },
  date: { type: Date },
  date: { type: String, default: "" },
});
module.exports = mongoose.model("Order", orderSchema);
