import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "../../public/restoDetail.css";

function RestaurantDetails() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/restoDetail");
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  return <>
    <h1 className='text-white text-center'>Our Restaurants</h1>
    <div className="resto-detail-container">
      {restaurants.map(restaurant => (
        <div key={restaurant._id} className="resto-detail-box">
          <div className="resto-detail-row">
            <p className="resto-detail-label">Name:</p>
            <p className="resto-detail-value">{restaurant.firstName} {restaurant.lastName}</p>
          </div>
          <div className="resto-detail-row">
            <p className="resto-detail-label">Email:</p>
            <p className="resto-detail-value">{restaurant.email}</p>
          </div>
          <div className="resto-detail-row">
            <p className="resto-detail-label">Phone No:</p>
            <p className="resto-detail-value">{restaurant.phone}</p>
          </div>
          <div className="resto-detail-row">
            <p className="resto-detail-label">City:</p>
            <p className="resto-detail-value">{restaurant.city}</p>
          </div>
          <div className="resto-detail-row">
            <p className="resto-detail-label">Pincode:</p>
            <p className="resto-detail-value">{restaurant.pinCode}</p>
          </div>
          <div className="resto-detail-row">
            <p className="resto-detail-label">Address:</p>
            <p className="resto-detail-value">{restaurant.address}</p>
          </div>
          <button className="resto-detail-button">
            <NavLink to="/login" className="text-decoration-none text-white">Log In To Explore!</NavLink>
          </button>
        </div>
      ))}
    </div>
  </>
}

export default RestaurantDetails;
