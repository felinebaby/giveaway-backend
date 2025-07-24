const { instanceId } = require("firebase-admin");
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

// Get Item ID
const getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get User ID
const getItemsByUserId = async (req, res) => {
  const userId = req.params.userId;

  // restrict access to only the authenticated user
  if (req.user.uid !== userId) {
    return res
      .status(403)
      .json({ error: "Not authorized to view these items" });
  }
  try {
    const items = await Item.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching user items:", error.message);
    res.status(500).json({ error: "Server error while fetching items" });
  }
};

// Update an existing item (e.g., mark as taken or edit details) – must be owner

const updateItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Only the owner can update
    if (item.userId !== req.user.uid) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this item" });
    }

    // Whitelist fields that can be updated
    const allowedFields = [
      "title",
      "description",
      "location",
      "pickupTime",
      "category",
      "imageUrl",
      "isTaken",
      "price",
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    const updated = await item.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update item failed:", error.message);
    res.status(500).json({ error: "Server error while updating item" });
  }
};

// Delete an item – only allowed by the item's owner
const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Only the owner can delete
    if (item.userId !== req.user.uid) {
      res.status(403).json({ error: "Not authorized to delete this item" });
    }

    await item.remove();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch {
    console.error("Delete item failed:", error.message);
    res.status(500).json({ error: "Server error while deleting item" });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  getItemsByUserId,
  updateItem,
  deleteItem,
};
