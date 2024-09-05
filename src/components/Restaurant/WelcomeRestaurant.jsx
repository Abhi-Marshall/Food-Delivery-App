import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../../public/restaurantCSS/WelcomeRestaurant.css';
import img from "../../images/restaurant-avatar.jpeg";
import LogoutButton from '../LogoutButton';
import axios from 'axios';

axios.defaults.withCredentials = true;

function WelcomeRestaurantOwner() {

  //

  const [welcomeMessage, setWelcomeMessage] = useState('Customer');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/WelcomeRestaurant', { withCredentials: true });
        setWelcomeMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Redirect to login if unauthorized or forbidden
          navigate('/login');
        }
      }
    };

    fetchWelcomeMessage();
  }, [navigate]);

  //
  
  return (
    <div className="container-fluid text-white welcome-restaurant-container">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="welcome-title">Welcome, {welcomeMessage}!</h1>
          <div className="btn-group mb-4">
            <NavLink to="/profile" className="btn btn-profile">Profile</NavLink>
            <NavLink to="/view-orders" className="btn btn-view-orders">View Orders</NavLink>
            <NavLink to="/add-dish" className="btn btn-add-dish">Add New Dish</NavLink>
            <NavLink to="/update-menu" className="btn btn-update-menu">Update Menu</NavLink>
            <LogoutButton />
          </div>
          <div className="quote-container">
            <blockquote className="blockquote">
              <p className="mb-0">"Good food is the foundation of genuine happiness."</p>
              <footer className="blockquote-footer mt-2">Auguste Escoffier</footer>
            </blockquote>
          </div>
          <div className="image-text-container">
            <div className="row">
              <div className="col-md-6">
                <div className="image-container">
                  <img src={img} alt="Restaurant Logo" className="img-fluid rounded shadow" />
                </div>
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <p className="info-text">
                  "Our restaurant prides itself on delivering the best culinary experience, using the freshest ingredients and unique recipes that make our dishes unforgettable. Join us on this gastronomic journey!"
                </p>
                <p className="info-text">
                  "We value your partnership and look forward to serving delicious food to our beloved customers. Let's make every meal a memorable one!"
                </p>
              </div>
            </div>
          </div>
          <div className="additional-space">
            <p className="info-text">
              "Explore our features to manage your restaurant efficiently and grow your business. Together, we can achieve great success!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomeRestaurantOwner;
