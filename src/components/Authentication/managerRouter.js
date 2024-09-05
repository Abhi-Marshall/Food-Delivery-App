import express from 'express';
import bcrypt from 'bcrypt';
import User from './models/userSchema.js';
import Staff from './models/staffSchema.js';
import Dish from './models/dishSchema.js';
import Order from './models/orderSchema.js';

const managerRouter = express.Router();
managerRouter.post('/registerManager', async (req, res) => {
  const { firstName, lastName, city, email, password, phone, address, pinCode, role } = req.body;
  
  try {
    // Check if manager already exists
    const existingManager = await User.findOne({ email });
    if (existingManager) {
      return res.status(201).json({ message: 'Manager already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new User({
      firstName,
      lastName,
      city,
      email,
      password: hashedPassword,
      phone,
      address,
      pinCode,
      role,
    });
    await newManager.save();
    res.status(201).json({ message: 'Manager registered successfully' });
  } catch (error) {
    console.error('Error registering manager:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to request manager access
managerRouter.post('/managerAccess', async (req, res) => {
  const { firstName, lastName, city, email, password, phone, address, pinCode, role } = req.body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
      }

      const existingStaff = await Staff.findOne({ email });
      if (existingStaff) {
          return res.status(409).json({ error: 'Manager access request already submitted' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newStaff = new Staff({ firstName, lastName, city, email, password: hashedPassword, phone, address, pinCode, role });
      await newStaff.save();

      res.status(201).json({ message: 'Manager access request submitted successfully' });
  } catch (error) {
      console.error('Error in manager access route:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch pending manager access requests
managerRouter.get('/pendingRequests', async (req, res) => {
  try {
      const pendingRequests = await Staff.find({});
      res.status(200).json(pendingRequests);
  } catch (error) {
      console.error('Error fetching pending requests:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to approve manager access
managerRouter.post('/approveManager', async (req, res) => {
  const { email } = req.body;

  try {
      const staffMember = await Staff.findOne({ email });

      if (!staffMember) {
          return res.status(404).json({ error: 'Request not found' });
      }

      const newUser = new User({ 
          firstName: staffMember.firstName, 
          lastName: staffMember.lastName, 
          city: staffMember.city, 
          email: staffMember.email, 
          password: staffMember.password, 
          phone: staffMember.phone, 
          address: staffMember.address, 
          pinCode: staffMember.pinCode, 
          role: staffMember.role 
      });
      await newUser.save();
      await Staff.deleteOne({ email });

      res.status(200).json({ message: 'Manager access approved successfully' });
  } catch (error) {
      console.error('Error approving manager access:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to deny manager access
managerRouter.post('/denyManager', async (req, res) => {
  const { email } = req.body;

  try {
      const result = await Staff.deleteOne({ email });
      if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Request not found' });
      }

      res.status(200).json({ message: 'Manager access denied successfully' });
  } catch (error) {
      console.error('Error denying manager access:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//Manage-Staff

// Fetch Delivery Guys
managerRouter.get('/manageStaff', async (req, res) => {
  try {
    const deliveryGuys = await User.find({ role: 'Delivery Guy' }, 'firstName lastName email phone city address pinCode');
    res.status(200).json(deliveryGuys);
  } catch (error) {
    console.error('Error fetching delivery guys:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Discard Delivery Guy
managerRouter.post('/discardStaff', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await User.deleteOne({ email, role: 'Delivery Guy' });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Delivery guy not found' });
    }
    res.status(200).json({ message: 'Delivery guy discarded successfully' });
  } catch (error) {
    console.error('Error discarding delivery guy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Fetch Restaurants
managerRouter.get('/managerResto', async (req, res) => {
  try {
    const restaurants = await User.find({ role: 'Restaurant Owner' }, 'firstName lastName city email phone address pinCode');
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Fetch Dishes for a Restaurant
managerRouter.post('/managerRestoView', async (req, res) => {
  const { restaurantEmail } = req.body;
  try {
    const dishes = await Dish.find({ restaurantEmail });
    res.status(200).json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Discard a Restaurant
managerRouter.post('/managerRestoDiscard', async (req, res) => {
  const { restaurantEmail } = req.body;

  try {
    await User.deleteOne({ email: restaurantEmail, role: 'Restaurant Owner' });
    await Dish.deleteMany({ restaurantEmail });
    res.status(200).json({ message: 'Restaurant discarded successfully' });
  } catch (error) {
    console.error('Error discarding restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

managerRouter.get('/manage-orders', async (req, res) => {
  try {
    const { status } = req.query;
    let orders;
    if (status) {
      orders = await Order.find({ status });
    } else {
      orders = await Order.find();
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default managerRouter;
