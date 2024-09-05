import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import "../../public/login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
  
      if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error,
        });
      } else {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  
        // Ensure role comparison is case-insensitive and exact
        if (role.toLowerCase() === 'customer') {
          navigate('/WelcomeCustomer');
        } else if (role.toLowerCase() === 'delivery guy') {
          navigate('/WelcomeDelivery');
        } else if (role.toLowerCase() === 'restaurant owner') {
          navigate('/WelcomeRestaurant');
        } else if (role.toLowerCase() === 'manager') {
          navigate('/WelcomeManager');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred while logging in. Please try again later.',
      });
    }
  };
  

  return (
    <div className="login-gradient">
      <div className="col-md-6 p-4 shadow-lg rounded text-info login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary rounded-pill fw-bold text-white position-relative" style={{left: "45%"}}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
