// src/components/CustomerOrder.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../public/customerCSS/customerOrder.css';

const CustomerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [filter]);

  const fetchOrders = () => {
    const url = filter ? `http://localhost:5000/customer-orders?status=${filter}` : 'http://localhost:5000/customer-orders';
    axios.get(url)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  };

  return (
    <div className="customer-order-analytics-container">
      <div className="customer-order-analytics-filter-buttons">
        <button onClick={() => setFilter('On The Way!')} className={filter === 'On The Way!' ? 'active' : ''}>On the Way</button>
        <button onClick={() => setFilter('Delivered!')} className={filter === 'Delivered!' ? 'active' : ''}>Delivered</button>
      </div>
      <div className="customer-order-analytics-order-cards">
        {orders.map(order => (
          <div key={order.orderId} className="customer-order-analytics-order-card">
            <img src={`http://localhost:5000/uploads/${order.dishImage}`} alt={order.dishName} className="customer-order-analytics-order-image" />
            <div className="customer-order-analytics-order-details">
              <h3>{order.dishName}</h3>
              <p><strong>Order ID:</strong> <span>{order.orderId}</span></p>
              <p><strong>Transaction ID:</strong> <span>{order.transactionId}</span></p>
              <p><strong>Restaurant Name:</strong> <span>{order.restaurantName}</span></p>
              <p><strong>Restaurant Email:</strong> <span>{order.restaurantEmail}</span></p>
              <p><strong>Restaurant Phone:</strong> <span>{order.restaurantPhone}</span></p>
              <p><strong>Dish Type:</strong> <span>{order.dishType}</span></p>
              <p><strong>Dish Price (INR):</strong> <span>{order.dishPrice}</span></p>
              <p><strong>Customer Name:</strong> <span className="customer-gradient-text">{order.customerName}</span></p>
              <p><strong>Customer Email:</strong> <span className="customer-gradient-text">{order.customerEmail}</span></p>
              <p><strong>Customer Phone:</strong> <span>{order.customerPhone}</span></p>
              <p><strong>Customer City:</strong> <span>{order.customerCity}</span></p>
              <p><strong>Delivery Guy Name:</strong> <span>{order.deliveryBoyName}</span></p>
              <p><strong>Delivery Guy Email:</strong> <span>{order.deliveryBoyEmail}</span></p>
              <p><strong>Delivery Guy Phone:</strong> <span>{order.deliveryBoyPhone}</span></p>
              <p><strong>Date:</strong> <span>{order.date}</span></p>
              <p><strong>Time:</strong> <span>{order.time}</span></p>
              <p><strong className='fs-5'>Status:</strong> <span className="customer-status-gradient">{order.status}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CustomerOrder;
