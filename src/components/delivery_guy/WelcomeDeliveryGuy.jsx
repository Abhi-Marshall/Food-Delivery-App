import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../../../public/deliveryGuyCSS/WelcomeDeliveryGuy.css'; // Ensure correct import
import img from "../../images/delivery-boy-avatar.webp";
import LogoutButton from "../LogoutButton";
import axios from 'axios';

axios.defaults.withCredentials = true;

function WelcomeDeliveryGuy() {

  // 

  const [welcomeMessage, setWelcomeMessage] = useState('Customer');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/WelcomeDelivery', { withCredentials: true });
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

  const [isAvailable, setIsAvailable] = useState(true);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="container-fluid text-white welcome-delivery-container">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="mb-4">Welcome, {welcomeMessage}!</h1>
          <div className="btn-group mb-4">
            <NavLink to="/profile" className="btn btn-gradient">Profile</NavLink>
            <NavLink to="/delivery-view-orders" className="btn btn-gradient">View Orders</NavLink>
            <LogoutButton />
          </div>
          <div className="quote-container-delivery">
            <blockquote className="blockquote">
              <p className="mb-0">"The only way to do great work is to love what you do."</p>
              <footer className="blockquote-footer mt-1">Steve Jobs</footer>
            </blockquote>
          </div>
          <div className="image-container">
            <img src={img} alt="Delivery Guy" className="img rounded shadow rounded-pill" width={280} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeDeliveryGuy;
