import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../public/customerCSS/customerMenu.css";
import Swal from 'sweetalert2';
import { load } from '@cashfreepayments/cashfree-js';

function Egg() {
    const [dishes, setDishes] = useState([]);
  
    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/customerMenuEgg");
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    let cashfree;

    let insitialzeSDK = async function () {

        cashfree = await load({
            mode: "sandbox",
        })
    }

    insitialzeSDK()

    const [orderId, setOrderId] = useState("")

    const getSessionId = async (dishId) => {
        try {
            const res = await axios.get(`http://localhost:5000/payment?dishId=${dishId}`);
    
            if (res.data && res.data.payment_session_id) {
                // console.log(res.data);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    const verifyPayment = async () => {
        
        try {
            Swal.fire({
                title: 'Payment Successful',
                text: 'Your payment has been processed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            let res = await axios.post("http://localhost:5000/verify", {
                orderId: orderId
            })
            
            if (res && res.data) {
                console.log("payment done!");
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async (e, dishId) => {
        e.preventDefault()

        try {

            let sessionId = await getSessionId(dishId)
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            }

            cashfree.checkout(checkoutOptions).then((res) => {
                console.log("payment initialized")
                verifyPayment(orderId)
            })

        } catch (error) {
            console.log(error)
        }

    }


    return <>
        <h2 className='text-white text-center'>Egg Dishes</h2>
        <div className="customer-menu-container">
            <div className="customer-menu-dish-list">
                {dishes.map(dish => (
                    <div key={dish._id} className="customer-menu-dish-item">
                        <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="customer-menu-dish-image" />
                        <div className="customer-menu-label-value">
                            <span className="customer-menu-label">Type:</span>
                            <span className="customer-menu-value">{dish.type}</span>
                        </div>
                        <div className="customer-menu-label-value">
                            <span className="customer-menu-label">Name:</span>
                            <span className="customer-menu-value">{dish.name}</span>
                        </div>
                        <div className="customer-menu-label-value">
                            <span className="customer-menu-label">Quantity:</span>
                            <span className="customer-menu-value">{dish.quantity}</span>
                        </div>
                        <div className="customer-menu-label-value">
                            <span className="customer-menu-label">Price (INR):</span>
                            <span className="customer-menu-value">{dish.price}</span>
                        </div>
                        <div className="customer-menu-button-container">
                            <button className="btn btn-order-now" onClick={(e) => handleClick(e, dish._id)}>Order Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default Egg;














