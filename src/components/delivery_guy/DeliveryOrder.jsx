// src/components/DeliveryOrder.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../public/deliveryGuyCSS/DeliveryOrder.css';

const DeliveryOrder = () => {
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
      const url = filter ? `http://localhost:5000/delivery-orders?status=${filter}` : 'http://localhost:5000/delivery-orders';
      axios.get(url)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the orders!', error);
        });
    };

    const markDelivered = (orderId) => {
        axios.put(`http://localhost:5000/delivery-orders/${orderId}`, { status: 'Delivered!' })
          .then(response => {
            fetchOrders(); // Refresh orders after successful update
          })
          .catch(error => {
            console.error('There was an error updating the order status!', error);
          });
    };
      
  return (
    <div className="delivery-order-analytics-container">
      <div className="delivery-order-analytics-filter-buttons">
        <button onClick={() => setFilter('On The Way!')} className={filter === 'On The Way!' ? 'active' : ''}>On the Way</button>
        <button onClick={() => setFilter('Delivered!')} className={filter === 'Delivered!' ? 'active' : ''}>Delivered</button>
      </div>
      <div className="delivery-order-analytics-order-cards">
        {orders.map(order => (
          <div key={order.orderId} className="delivery-order-analytics-order-card">
            <img src={`http://localhost:5000/uploads/${order.dishImage}`} alt={order.dishName} className="delivery-order-analytics-order-image" />
            <div className="delivery-order-analytics-order-details">
              <h3>{order.dishName}</h3>
              <p><strong>Order ID:</strong> <span>{order.orderId}</span></p>
              <p><strong>Transaction ID:</strong> <span>{order.transactionId}</span></p>
              <p><strong>Restaurant Name:</strong> <span>{order.restaurantName}</span></p>
              <p><strong>Restaurant Email:</strong> <span>{order.restaurantEmail}</span></p>
              <p><strong>Restaurant Phone:</strong> <span>{order.restaurantPhone}</span></p>
              <p><strong>Dish Type:</strong> <span>{order.dishType}</span></p>
              <p><strong>Dish Price (INR):</strong> <span>{order.dishPrice}</span></p>
              <p><strong>Customer Name:</strong> <span>{order.customerName}</span></p>
              <p><strong>Customer Email:</strong> <span>{order.customerEmail}</span></p>
              <p><strong>Customer Phone:</strong> <span>{order.customerPhone}</span></p>
              <p><strong>Customer City:</strong> <span>{order.customerCity}</span></p>
              <p><strong>Delivery Guy Name:</strong> <span className="delivery-gradient-text">{order.deliveryBoyName}</span></p>
              <p><strong>Delivery Guy Email:</strong> <span className="delivery-gradient-text">{order.deliveryBoyEmail}</span></p>
              <p><strong>Delivery Guy Phone:</strong> <span>{order.deliveryBoyPhone}</span></p>
              <p><strong>Date:</strong> <span>{order.date}</span></p>
              <p><strong>Time:</strong> <span>{order.time}</span></p>
              <p><strong className='fs-5'>Status:</strong> <span className="delivery-status-gradient">{order.status}</span></p>
              {order.status === 'On The Way!' && <button onClick={() => markDelivered(order._id)} className="delivery-order-analytics-mark-delivered">Mark Delivered</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DeliveryOrder;
