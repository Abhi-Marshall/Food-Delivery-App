import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../public/managerCSS/ManagerManageStaff.css';

function ManagerManageStaff() {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manageStaff', { withCredentials: true });
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/login');
        }
      }
    };

    fetchStaff();
  }, [navigate]);

  const handleDiscard = (email) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, discard it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:5000/discardStaff', { email }, { withCredentials: true })
          .then((response) => {
            Swal.fire(
              'Discarded!',
              'The delivery guy has been discarded.',
              'success'
            );
            setStaff(staff.filter((s) => s.email !== email));
          })
          .catch((error) => {
            console.error('Error discarding staff:', error);
            Swal.fire(
              'Error!',
              'There was an error discarding the delivery guy.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="manager-manage-staff-container">
      <h1 className="manager-manage-staff-h1">Manage Staff</h1>
      <div className="staff-list">
        {staff.map((s) => (
          <div key={s._id} className="staff-card">
            <div className="staff-details">
              <p><strong>First Name:</strong> {s.firstName}</p>
              <p><strong>Last Name:</strong> {s.lastName}</p>
              <p><strong>Email:</strong> {s.email}</p>
              <p><strong>Phone:</strong> {s.phone}</p>
              <p><strong>City:</strong> {s.city}</p>
              <p><strong>Address:</strong> {s.address}</p>
              <p><strong>Pincode:</strong> {s.pinCode}</p>
            </div>
            <div className="staff-actions">
              <button className="discard-btn" onClick={() => handleDiscard(s.email)}>Discard</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerManageStaff;
