const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/product')
  .then(() => console.log('Connected!'));

const foodItemSchema = new mongoose.Schema({
  food_name: String,
  food_category: String,
  food_type: String,
  food_quantity: Number,
  food_image: String,
  price: Number
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;