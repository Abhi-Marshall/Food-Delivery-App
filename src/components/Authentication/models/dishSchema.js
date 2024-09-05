import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  image: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  restaurantName: { type: String, required: true },
  restaurantEmail: { type: String, required: true }
});

const Dish = mongoose.model('Dish', dishSchema, 'dish');

export default Dish;
