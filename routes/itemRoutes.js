const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// CREATE ITEM
router.post("/", createItem);

// GET ALL ITEMS
router.get("/", getItems);

// GET SINGLE ITEM
router.get("/:id", getItemById);

// UPDATE ITEM
router.put("/:id", updateItem);

// DELETE ITEM
router.delete("/:id", deleteItem);

module.exports = router;