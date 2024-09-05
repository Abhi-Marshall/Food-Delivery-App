import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../public/managerCSS/managerAccess.css'; 

function ManagerAccess() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/pendingRequests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (email) => {
        try {
            await axios.post('http://localhost:5000/approveManager', { email });
            Swal.fire('Success', 'Manager access approved successfully', 'success');
            setRequests(requests.filter(request => request.email !== email));
        } catch (error) {
            console.error('Error approving manager access:', error);
            Swal.fire('Error', 'Failed to approve manager access', 'error');
        }
    };

    const handleDeny = async (email) => {
        try {
            await axios.post('http://localhost:5000/denyManager', { email });
            Swal.fire({
                icon: 'error', 
                title: 'Denied',
                text: 'Manager access denied successfully',
                background: '#f8d7da',
                color: '#721c24' 
            });
            setRequests(requests.filter(request => request.email !== email));
        } catch (error) {
            console.error('Error denying manager access:', error);
            Swal.fire('Error', 'Failed to deny manager access', 'error');
        }
    };

    return (
        <div className="manager-access-container">
            <h1 className='manager-access-h1'>Pending Manager Access Requests</h1>
            <div className="requests-list">
                {requests.map(request => (
                    <div key={request.email} className="request-card">
                        <div className="request-details">
                            <p><strong>First Name:</strong> {request.firstName}</p>
                            <p><strong>Last Name:</strong> {request.lastName}</p>
                            <p><strong>City:</strong> {request.city}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Phone:</strong> {request.phone}</p>
                            <p><strong>Address:</strong> {request.address}</p>
                            <p><strong>Pin Code:</strong> {request.pinCode}</p>
                            <p><strong>Role:</strong> {request.role}</p>
                        </div>
                        <div className="request-actions">
                            <button className="approve-btn" onClick={() => handleApprove(request.email)}>Approve</button>
                            <button className="deny-btn" onClick={() => handleDeny(request.email)}>Deny</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagerAccess;
