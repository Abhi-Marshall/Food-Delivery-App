// src/components/register.jsx
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../public/registration.css'; // Import custom CSS file
import axios from 'axios'; // Import Axios for making HTTP requests

function Register() {
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();

  const phoneRef = useRef(null);
  const passRef = useRef(null);
  const pinRef = useRef(null);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  // Function to validate the phone number (accept only numbers)
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(value);
  };

  // Function to validate the password (alphanumeric with at least one special character @#%&)
  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9@#%&])[a-zA-Z0-9@#%&]{6,}$/;
    return passwordRegex.test(value);
  };

  // Function to validate the pin code (exactly 6 digits)
  const validatePinCode = (value) => {
    const pinCodeRegex = /^\d{6}$/;
    return pinCodeRegex.test(value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Access form element
    const firstName = event.target.elements['first-name'].value;
    const lastName = event.target.elements['last-name'].value;
    const city = event.target.elements.city.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const phone = event.target.elements.phone.value;
    const address = event.target.elements.address.value;
    const pinCode = event.target.elements.pinCode.value;
    const role = event.target.elements.userRole.value;

    // Perform validation
    if (!validatePhoneNumber(phone)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid phone number (only 10 digits allowed).",
      }).then(() => {
        phoneRef.current.focus();
      });
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be alphanumeric with at least one capital letter and at least one special character (@, #, %, &), and minimum 6 characters long.",
      }).then(() => {
        passRef.current.focus();
      });
      return;
    }

    if (!validatePinCode(pinCode)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid 6-digit pin code.",
      }).then(() => {
        pinRef.current.focus();
      });
      return;
    }

    // Prepare data for sending to backend
    const formData = {
      firstName,
      lastName,
      city,
      email,
      password,
      phone,
      address,
      pinCode,
      role,
    };

    try {
      // Determine the endpoint based on the role
      const endpoint = role === 'Customer' ? 'http://localhost:5000/register' : 'http://localhost:5000/managerAccess';

      // Send POST request to backend
      const response = await axios.post(endpoint, formData);

      // Handle success response
      if (role === 'Customer') {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have successfully registered.",
        }).then(() => {
          navigate('/login'); // Redirect to the login page using useNavigate
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Registration Submitted",
          text: "Please wait for manager access approval.",
        }).then(() => {
          navigate('/login'); // Redirect to the login page using useNavigate
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "An error occurred while registering. Please try again later.",
      });
    }
  };

  return (
    <div className="registration-gradient">
      <div className="col-md-6 p-4 shadow-lg rounded text-white registration-form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first-name" className="form-label fw-bold">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="first-name" 
              name="first-name"
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last-name" className="form-label fw-bold">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="last-name" 
              name="last-name"
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label fw-bold">City</label>
            <input 
              type="text" 
              className="form-control" 
              id="city" 
              name="city"
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email"
              aria-describedby="emailHelp" 
              required 
            />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <div className="input-group">
              <input 
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                className="form-control" 
                id="password" 
                name="password"
                ref={passRef}
                required 
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
            <input 
              type="tel" 
              className="form-control" 
              id="phone" 
              name="phone"
              ref={phoneRef}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-bold">Address</label>
            <textarea 
              className="form-control" 
              id="address" 
              name="address"
              rows="3" 
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="pinCode" className="form-label fw-bold">Pin Code</label>
            <input 
              type="text" 
              className="form-control" 
              id="pinCode" 
              name="pinCode"
              ref={pinRef}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userRole" className="form-label fw-bold">Select Role</label>
            <select 
              id="userRole" 
              className="form-select-registration form-control mt-1" 
              style={{ border: '1px solid #ced4da' }} 
              required
            >
              <option value="null" disabled selected>Select your role ✌️</option>
              <option value="Customer">Customer</option>
              <option value="Delivery Guy">Delivery Guy</option>
              <option value="Restaurant Owner">Restaurant Owner</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary rounded-pill">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
