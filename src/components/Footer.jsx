// Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Footer() {
  const navigate = useNavigate();

  const handleManagerClick = async () => {
    try {
      const managerDetails = {
        firstName: 'Abhi',
        lastName: 'Marshall',
        city: 'Patna',
        email: 'marshallabhi.2004@gmail.com',
        password: '@2024Manager',
        phone: '7004863472',
        address: 'Pizza Hut Boring Road',
        pinCode: '800001',
        role: 'Manager'
      };

      const response = await axios.post('http://localhost:5000/registerManager', managerDetails);
      console.log(response.data); // For debugging
      navigate('/login');
    } catch (error) {
      console.error('Error registering manager:', error);
    }
  };

  return (
    <footer className="footer text-white py-4 position-relative">
      <div id="footer-opacity"></div>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <NavLink to="/" className="btn btn-outline-light btn-block mb-2">Home</NavLink>
            <NavLink to="/login" className="btn btn-outline-light btn-block mb-2">Login</NavLink>
            <NavLink to="/register" className="btn btn-outline-light btn-block mb-2">Register</NavLink>
            <button className="btn btn-outline-light btn-block mb-2" onClick={handleManagerClick}>Manager</button>
          </div>
          <div className="col-md-4 text-center">
            <h5 className="mb-3">Follow Us</h5>
            <a href="#" className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="col-md-4 text-md-right">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: marshallabhi.2004@gmail.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


