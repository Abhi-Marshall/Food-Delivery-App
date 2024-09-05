import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../public/profile.css';  // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
        setUser(response.data);
        setEditUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/login');
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const getWelcomePage = (role) => {
    switch(role) {
      case 'Manager':
        return '/WelcomeManager';
      case 'Customer':
        return '/WelcomeCustomer';
      case 'Delivery Guy':
        return '/WelcomeDelivery';
      case 'Restaurant Owner':
        return '/WelcomeRestaurant';
      default:
        return '/';
    }
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure the passwords match.',
      });
      return;
    }

    try {
      const updatedData = { ...editUser };
      if (password) {
        updatedData.password = password;
      }

      await axios.put('http://localhost:5000/profile', updatedData, { withCredentials: true });
      setUser(editUser);
      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate(getWelcomePage(user.role));  // Redirect to the respective welcome page
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile.',
        text: 'Please try again later.',
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profile</h2>
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="profile-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="profile-form-control"
                  value={editUser.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="profile-form-control"
                  value={editUser.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="profile-form-control"
                  value={editUser.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="profile-form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="profile-form-control"
                  value={editUser.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="profile-form-control"
                  value={editUser.city}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="profile-form-control"
                  value={editUser.address}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  className="profile-form-control"
                  value={editUser.pinCode}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="password"
                  className="profile-form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="profile-form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className="text-center">
                <button type="button" className="profile-btn profile-btn-primary mt-3 rounded-pill fw-bolder" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
