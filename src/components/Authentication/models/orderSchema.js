import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    transactionId: { type: String, required: true },
    restaurantEmail: { type: String, required: true },
    restaurantName: { type: String, required: true },
    restaurantPhone: { type: String, required: true },
    dishImage: { type: String, required: true },
    dishType: { type: String, required: true },
    dishName: { type: String, required: true },
    dishPrice: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerCity: { type: String, required: true },
    deliveryBoyName: { type: String, required: true },
    deliveryBoyEmail: { type: String, required: true },
    deliveryBoyPhone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema, 'order');

export default Order;
