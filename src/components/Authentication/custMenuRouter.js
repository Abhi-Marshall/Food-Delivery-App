import express from "express";
import Dish from "./models/dishSchema.js";
import path from "path";
import Order from "./models/orderSchema.js";
import jwt from "jsonwebtoken";
import User from './models/userSchema.js';

const custMenuRouter = express.Router();

custMenuRouter.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

custMenuRouter.get("/customerMenuFish", async (req, res) => {
  try {
    const dishes = await Dish.find({ type: "Fish" });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

custMenuRouter.get("/customerMenuChicken", async (req, res) => {
  try {
    const dishes = await Dish.find({ type: "Chicken" });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

custMenuRouter.get("/customerMenuEgg", async (req, res) => {
  try {
    const dishes = await Dish.find({ type: "Egg" });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

custMenuRouter.get("/customerMenuPaneer", async (req, res) => {
  try {
    const dishes = await Dish.find({ type: "Paneer" });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = decodedToken; // Store decoded token in req.user
    next();
  });
};

custMenuRouter.get('/customer-orders', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'Customer') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { status } = req.query;
    let orders;
    if (status) {
      orders = await Order.find({ customerEmail: user.email, status });
    } else {
      orders = await Order.find({ customerEmail: user.email });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default custMenuRouter;
