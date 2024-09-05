import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../../public/managerCSS/ManagerWelcome.css';
import managerImg from '../../images/manager-avatar.avif';
import LogoutButton from '../LogoutButton';
import axios from 'axios';

  axios.defaults.withCredentials = true;
function ManagerWelcome() {

  //

  const [welcomeMessage, setWelcomeMessage] = useState('Customer');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/WelcomeManager', { withCredentials: true });
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
    <div className="manager-welcome-container">
      <div className="background-overlay"></div>
      <div className="background-structures"></div>
      <div className="manager-header">
        <h1>Welcome, {welcomeMessage}!</h1>
        <img src={managerImg} alt="Manager Avatar" className="manager-avatar" />
      </div>
      <div className="manager-content">
        <div className="manager-buttons">
          <NavLink to="/profile" className="manager-btn manager-btn-profile">Profile</NavLink>
          <NavLink to="/manage-staff" className="manager-btn manager-btn-manage-staff">Manage Staff</NavLink>
          <NavLink to="/order-analytics" className="manager-btn manager-btn-order-analytics">Order Analytics</NavLink>
          <NavLink to="/restaurant-management" className="manager-btn manager-btn-restaurant-management">Restaurant Management</NavLink>
          <NavLink to="/managerAccess" className="manager-btn">Access</NavLink>
          <LogoutButton />
        </div>
        <div className="manager-quote">
          <blockquote>
            <p className='text-white'>"The key to successful leadership is influence, not authority."</p>
            <footer>— Kenneth H. Blanchard</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default ManagerWelcome;
