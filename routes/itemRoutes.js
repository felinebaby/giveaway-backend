const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createItem,
  getItems,
  getItemById,
  getItemsByUserId,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// POST /api/items - create a new giveaway item
router.post("/", authMiddleware, createItem);

// GET /api/items - get all items
router.get("/", getItems);

// GET /api/items/:id - view single item
router.get("/:id", getItemById);

// GET /api/items/user/:id – get items by user ID (protected)
router.get("/user/:id", authMiddleware, getItemsByUserId);

// PUT /api/items/:id - update item (mark taken / edit fields) (protected)
router.put("/:id", authMiddleware, updateItem);

// DELETE /api/items/:id - delete item (only owner)
router.delete("/:id", authMiddleware, deleteItem);

module.exports = router;
