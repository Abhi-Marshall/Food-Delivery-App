import express from 'express';
import jwt from 'jsonwebtoken';
import User from './models/userSchema.js';
import Order from './models/orderSchema.js';

const router = express.Router();

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

// Fetch delivery orders
router.get('/delivery-orders', authenticateJWT, async (req, res) => {
    try {
      const { status } = req.query;
      const userId = req.user.userId;
  
      // Find the delivery guy's email from the user collection
      const deliveryGuy = await User.findOne({ _id: userId, role: 'Delivery Guy' });
  
      if (!deliveryGuy) {
        return res.status(404).json({ error: 'Delivery Guy not found' });
      }
  
      let query = { deliveryBoyEmail: deliveryGuy.email };
  
      if (status) {
        query.status = status;
      }
  
      const orders = await Order.find(query);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.put('/delivery-orders/:orderId', authenticateJWT, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      if (status !== 'Delivered!') {
        return res.status(400).json({ error: 'Invalid status update' });
      }
  
      // Fetch the order by orderId
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Ensure that the logged-in user is the delivery guy assigned to the order
      const userId = req.user.userId;
      const deliveryGuy = await User.findOne({ _id: userId, role: 'Delivery Guy' });
  
      if (!deliveryGuy || order.deliveryBoyEmail !== deliveryGuy.email) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      // Only update status if current status is 'On The Way!'
      if (order.status !== 'On The Way!') {
        return res.status(400).json({ error: 'Order is not On The Way!' });
      }
  
      order.status = status;
      await order.save();
      res.json(order);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
export default router;