// src/models/staffSchema.js
import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    role: { type: String, required: true },
});

export default mongoose.model('Staff', staffSchema, 'staff');
