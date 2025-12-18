const mongoose = require('mongoose');
const dotenv = require('dotenv');
const foodData = require('../backend/Data/Food-Data'); 
const FoodItem = require('../backend/model/model');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  try {
    await FoodItem.deleteMany();
    await FoodItem.insertMany(foodData);
    console.log('✅ Data seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});


