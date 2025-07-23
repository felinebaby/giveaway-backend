const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  category: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isTaken: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String, // later you can link this to a User model
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
