import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "../../public/homeOrderMenu.css";

function HomeOrderMenu() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchRandomOrderDishes();
  }, []);

  const fetchRandomOrderDishes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/homeOrderMenu");
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching random order dishes:', error);
    }
  };

  return (
    <div className="home-order-menu-container">
      {dishes.map(dish => (
        <div key={dish._id} className="home-order-menu-card">
          <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="home-order-menu-image" />
          <p><strong>Name:</strong> {dish.name}</p>
          <p><strong>Quantity:</strong> {dish.quantity}</p>
          <p><strong>Price:</strong> {dish.price}</p>
          <button className="home-order-menu-button">
            <NavLink to="/login" className="text-decoration-none text-white">Log In To Explore!</NavLink>
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomeOrderMenu;

