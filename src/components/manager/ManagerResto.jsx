import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../public/managerCSS/ManagerResto.css';

const ManagerResto = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/managerResto');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };
        fetchRestaurants();
    }, []);
    const handleView = async (email, fName, lName) => {
        try {
            const response = await axios.post('http://localhost:5000/managerRestoView', { restaurantEmail: email });
            setDishes(response.data);
            setSelectedRestaurant(fName + " " + lName);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };
    const handleDiscard = async (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, discard it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post('http://localhost:5000/managerRestoDiscard', { restaurantEmail: email });
                    setRestaurants(restaurants.filter(restaurant => restaurant.email !== email));
                    setDishes([]);
                    setSelectedRestaurant(null);
                    Swal.fire('Discarded!', 'The restaurant has been discarded.', 'success');
                } catch (error) {
                    console.error('Error discarding restaurant:', error);
                    Swal.fire('Error!', 'There was an error discarding the restaurant.', 'error');
                }
            }
        });
    };
    return <>
        <h1 className="manager-h1 text-center text-white">Restaurant Manager</h1>
        <div className="manager-resto">

            <div className="manager-restaurant-list">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.email} className="manager-restaurant-card">
                        <p><span className="manager-label">Name:</span> <span className="manager-value">{restaurant.firstName} {restaurant.lastName}</span></p>
                        <p><span className="manager-label">City:</span> <span className="manager-value">{restaurant.city}</span></p>
                        <p><span className="manager-label">Email:</span> <span className="manager-value">{restaurant.email}</span></p>
                        <p><span className="manager-label">Phone:</span> <span className="manager-value">{restaurant.phone}</span></p>
                        <p><span className="manager-label">Address:</span> <span className="manager-value">{restaurant.address}</span></p>
                        <p><span className="manager-label">Pin Code:</span> <span className="manager-value">{restaurant.pinCode}</span></p>
                        <div className="manager-button-container">
                            <button className="manager-btn manager-view-btn" onClick={() => handleView(restaurant.email, restaurant.firstName, restaurant.lastName)}>View</button>
                            <button className="manager-btn manager-discard-btn" onClick={() => handleDiscard(restaurant.email)}>Discard</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRestaurant && (
                <>
                    <h2 className="manager-h2">Dishes for {selectedRestaurant}</h2>
                    <div className="manager-dishes-list">
                        {dishes.map((dish) => (
                            <div key={dish._id} className="manager-dish-card">
                                <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="manager-dish-image" />
                                <div>
                                    <p><span className="manager-label">Type:</span> <span className="manager-value">{dish.type}</span></p>
                                    <p><span className="manager-label">Name:</span> <span className="manager-value">{dish.name}</span></p>
                                    <p><span className="manager-label">Quantity:</span> <span className="manager-value">{dish.quantity}</span></p>
                                    <p><span className="manager-label">Price:</span> <span className="manager-value">{dish.price} in rupees</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    </>
};
export default ManagerResto;
