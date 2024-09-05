import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "../../public/homeChicken.css";

function HomeChicken() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchChickenDishes();
  }, []);

  const fetchChickenDishes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/homeChicken");
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching chicken dishes:', error);
    }
  };

  return (
    <div className="home-chicken-container">
      {dishes.map(dish => (
        <div key={dish._id} className="home-chicken-card">
          <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="home-chicken-image" />
          <p><strong>Name:</strong> {dish.name}</p>
          <p><strong>Quantity:</strong> {dish.quantity}</p>
          <p><strong>Price:</strong> {dish.price}</p>
          <button className="home-chicken-button">
            <NavLink to="/login" className="text-decoration-none text-white">Log In To Explore!</NavLink>
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomeChicken;

