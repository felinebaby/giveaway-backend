const Item = require("../models/Item");

// Create new item
const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Create item failed:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

module.exports = {
  createItem,
  getItems,
};
