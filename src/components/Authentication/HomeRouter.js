import express from 'express';
import User from './models/userSchema.js';
import Dish from './models/dishSchema.js';

const homeRouter = express.Router();
homeRouter.get('/restoDetail', async (req, res) => {
    try {
        const restaurantOwners = await User.find({ role: 'Restaurant Owner' }).select('-password -role');
        res.status(200).json(restaurantOwners);
    } catch (error) {
        res.status(500).json({ error: 'Some error occurred' });
    }
});
homeRouter.get('/homeChicken', async (req, res) => {
    try {
        const dishes = await Dish.find({ type: 'Chicken' });
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching chicken dishes:', error);
        res.status(500).json({ message: 'Error fetching chicken dishes' });
    }
});

homeRouter.get('/homePaneer', async (req, res) => {
    try {
        const dishes = await Dish.find({ type: 'Paneer' });
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching paneer dishes:', error);
        res.status(500).json({ message: 'Error fetching paneer dishes' });
    }
});
homeRouter.get('/homeOrderMenu', async (req, res) => {
    try {
        const dishes = await Dish.aggregate([{ $sample: { size: 10 } }]);
        res.json(dishes);
    } catch (error) {
        console.error('Error fetching order menu dishes:', error);
        res.status(500).json({ message: 'Error fetching order menu dishes' });
    }
});

export default homeRouter;



