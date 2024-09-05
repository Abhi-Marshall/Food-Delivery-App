import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "../../public/homePaneer.css";

function HomePaneer() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchPaneerDishes();
  }, []);

  const fetchPaneerDishes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/homePaneer");
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching paneer dishes:', error);
    }
  };

  return (
    <div className="home-paneer-container">
      {dishes.map(dish => (
        <div key={dish._id} className="home-paneer-card">
          <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="home-paneer-image" />
          <p><strong>Name:</strong> {dish.name}</p>
          <p><strong>Quantity:</strong> {dish.quantity}</p>
          <p><strong>Price:</strong> {dish.price}</p>
          <button className="home-paneer-button">
            <NavLink to="/login" className="text-decoration-none text-white">Log In To Explore!</NavLink>
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePaneer;
