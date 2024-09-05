import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './models/userSchema.js';
import roleMiddleware from './roleMiddleware.js';
import managerRouter from './managerRouter.js';
import restaurantRouter from './restaurantRouter.js';
import custMenuRouter from './custMenuRouter.js';
import HomeRouter from './HomeRouter.js';
import cashfreePaymentRouter from './cashfreePaymentRouter.js';
import deliveryRouter from './deliveryGuyOrder.js';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret';

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/flavor_flyer';
mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const allowedOrigins = ['http://localhost:5000', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};
app.use(managerRouter);
app.use(restaurantRouter); 
app.use(custMenuRouter); 
app.use(HomeRouter); 
app.use(cashfreePaymentRouter);
app.use(deliveryRouter);

// Registration Route
app.post('/register', async (req, res) => {
  const { firstName, lastName, city, email, password, phone, address, pinCode, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
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
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Not Registered User' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Oops... Wrong Password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Logout Route
app.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Get User Role Route
app.get('/getUserRole', authenticateJWT, (req, res) => {
  res.json({ role: req.user.role });
});

// Check Login Status Route
app.get('/checkLoginStatus', authenticateJWT, (req, res) => {
  res.json({ isLoggedIn: true });
});

// Fetch user profile
app.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// Update user profile
app.put('/profile', authenticateJWT, async (req, res) => {
  try {
    const { firstName, lastName, city, phone, address, pinCode, password } = req.body;

    const updatedFields = { firstName, lastName, city, phone, address, pinCode };

    // If password is provided, hash it and add to updatedFields
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updatedFields,
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile.' });
  }
});

// Protected Routes
app.get('/WelcomeCustomer', authenticateJWT, roleMiddleware(['Customer']), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const welcomeMessage = `${user.firstName + " " + user.lastName}`;
    res.json({ message: welcomeMessage });
  } catch (error) {
    console.error('Error fetching welcome message:', error);
    res.status(500).json({ error: 'Failed to fetch welcome message.' });
  }
});

app.get('/WelcomeDelivery', authenticateJWT, roleMiddleware(['Delivery Guy']), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const welcomeMessage = `${user.firstName + " " + user.lastName}`;
    res.json({ message: welcomeMessage });
  } catch (error) {
    console.error('Error fetching welcome message:', error);
    res.status(500).json({ error: 'Failed to fetch welcome message.' });
  }
});

app.get('/WelcomeRestaurant', authenticateJWT, roleMiddleware(['Restaurant Owner']), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const welcomeMessage = `${user.firstName + " " + user.lastName}`;
    res.json({ message: welcomeMessage });
  } catch (error) {
    console.error('Error fetching welcome message:', error);
    res.status(500).json({ error: 'Failed to fetch welcome message.' });
  }
});

app.get('/WelcomeManager', authenticateJWT, roleMiddleware(['Manager']), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const welcomeMessage = `${user.firstName + " " + user.lastName}`;
    res.json({ message: welcomeMessage });
  } catch (error) {
    console.error('Error fetching welcome message:', error);
    res.status(500).json({ error: 'Failed to fetch welcome message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
