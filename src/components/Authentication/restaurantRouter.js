import express from "express";
import jwt from "jsonwebtoken";
import Dish from "./models/dishSchema.js";
import User from "./models/userSchema.js";
import multer from "multer";
import path from "path";
import Order from "./models/orderSchema.js";

const restaurantRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = decodedToken; 
    next();
  });
};

restaurantRouter.post("/addDish", authenticateJWT, upload.single("image"), async (req, res) => {
  const imgName = req.file.filename;
  const { type, name, quantity, price } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newDish = new Dish({
      image: imgName,
      type,
      name,
      quantity,
      price,
      restaurantName: user.firstName + ' ' + user.lastName,
      restaurantEmail: user.email
    });

    await newDish.save();
    res.status(201).json({ message: "Dish added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

restaurantRouter.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

restaurantRouter.get("/getDishes", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dishes = await Dish.find({ restaurantEmail: user.email });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

restaurantRouter.put("/updateDish/:id", authenticateJWT, async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, {
      name,
      quantity,
      price,
    }, { new: true });

    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

restaurantRouter.delete("/deleteDish/:id", authenticateJWT, async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);

    if (!deletedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Some error occurred" });
  }
});

restaurantRouter.get('/resto-orders', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'Restaurant Owner') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { status } = req.query;
    let orders;
    if (status) {
      orders = await Order.find({ restaurantEmail: user.email, status });
    } else {
      orders = await Order.find({ restaurantEmail: user.email });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default restaurantRouter;
