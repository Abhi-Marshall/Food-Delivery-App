import express from 'express';
import crypto from 'crypto';
import { Cashfree } from 'cashfree-pg';
import dotenv from 'dotenv';
import Dish from './models/dishSchema.js';
import jwt from 'jsonwebtoken';
import User from './models/userSchema.js';
import Order from './models/orderSchema.js';

const paymentRouter = express.Router();

dotenv.config();

paymentRouter.use(express.json());
paymentRouter.use(express.urlencoded({ extended: true }));

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// Middleware to authenticate JWT tokens
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

function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);
    const orderId = hash.digest('hex');
    return orderId.substr(0, 12);
}

paymentRouter.get('/payment', authenticateJWT, async (req, res) => {
    try {
        const { dishId } = req.query;
        console.log('Dish ID:', dishId);

        const dish = await Dish.findById(dishId);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        var price = dish.price;

        //Fetch customer details
        const customerId = req.user.userId;
        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Fetch restaurant details
        const restaurant = await User.findOne({ email: dish.restaurantEmail });
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        const deliveryBoys = await User.find({ role: 'Delivery Guy' });
        if (deliveryBoys.length === 0) {
            return res.status(404).json({ error: 'No delivery boys available' });
        }
        const deliveryBoy = deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];


        const name = customer.firstName + " " + customer.lastName;
        const phone = customer.phone;
        const email = customer.email;
        const orderId = generateOrderId();
        const transactionId = generateOrderId();

        let request = {
            "order_amount": price,
            "order_currency": "INR",
            "order_id": orderId,
            "customer_details": {
                "customer_id": customerId,
                "customer_phone": phone,
                "customer_name": name,
                "customer_email": email
            },
        };

        Cashfree.PGCreateOrder("2023-08-01", request).then(async response => {
            console.log(response.data);

            const newOrder = new Order({
                orderId: orderId,
                transactionId: transactionId,
                restaurantEmail: dish.restaurantEmail,
                restaurantName: dish.restaurantName,
                restaurantPhone: restaurant.phone,
                dishImage: dish.image,
                dishType: dish.type,
                dishName: dish.name,
                dishPrice: dish.price,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                customerCity: customer.city,
                deliveryBoyName: deliveryBoy.firstName+" "+deliveryBoy.lastName,
                deliveryBoyEmail: deliveryBoy.email,
                deliveryBoyPhone: deliveryBoy.phone,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString(),
                status: 'On The Way!',
            });
            await newOrder.save();
            res.json(response.data);
        }).catch(error => {
            console.error(error.response.data.message);
        });
    } catch (error) {
        console.log(error);
    }
});
paymentRouter.post('/verify', async (req, res) => {
    try {
        let { orderId } = req.body;
        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            res.json(response.data);
        }).catch(error => {
            console.error(error.response.data.message);
        });
    } catch (error) {
        console.log(error);
    }
});
export default paymentRouter;

