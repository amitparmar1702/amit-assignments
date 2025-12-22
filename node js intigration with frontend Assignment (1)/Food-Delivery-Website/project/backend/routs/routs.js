const express = require('express')
const FoodItem = require('../model/model.js')

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router
