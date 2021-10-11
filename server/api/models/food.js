const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});
module.exports = mongoose.model("Food", foodSchema);
