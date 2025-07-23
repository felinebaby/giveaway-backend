const express = require("express");
const router = express.Router();
const { createItem, getItems } = require("../controllers/itemController");

// POST /api/items - create a new giveaway item
router.post("/", createItem);

// GET /api/items - get all items
router.get("/", getItems);

module.exports = router;
