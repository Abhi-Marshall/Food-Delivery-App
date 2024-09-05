import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import "../../../public/customerCSS/WelcomeCustomer.css";
import CustomerButtons from './customer-buttons';
import CustomerCards from './CustomerCards';
import chickenTandoori from '../../images/customer-chicken-tandoori.avif';
import paneerCurry from '../../images/customer-paneer-curry.jpg';
import fishCurry from '../../images/customer-fish-curry.jpg';
import eggCurry from '../../images/customer-egg-curry.jpg';
import crunchyFish from '../../images/customer-crunchy-fish.jpeg';
import paneerButterMasala from '../../images/customer-paneer-butter-masala.jpeg';

axios.defaults.withCredentials = true;

function WelcomeCustomer() {
  const [welcomeMessage, setWelcomeMessage] = useState('Customer');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/WelcomeCustomer', { withCredentials: true });
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

  return (
    <div className="welcome-customer">
      <div className="container-fluid-customer py-5 text-white">
        <div className="row justify-content-center mb-5">
          <CustomerButtons wlcm={welcomeMessage} />
        </div>
        <div className="container">
          <div className="card-container-customer">
            <CustomerCards img={chickenTandoori} title={"Chicken Tandoori"} text={"A classic Indian dish chicken grilled to perfection."} to={"/chicken"}/>
            <CustomerCards img={paneerCurry} title={"Paneer Curry"} text={"Soft paneer cubes cooked in a creamy tomato-based curry."} to={"/paneer"}/>
            <CustomerCards img={fishCurry} title={"Fish Curry"} text={"Spicy and tangy fish curry made with fresh catch of the day."} to={"/fish"} />
            <CustomerCards img={eggCurry} title={"Egg Curry"} text={"Delicious egg curry made with a spicy and flavorful gravy."} to={"/egg"} />
            <CustomerCards img={crunchyFish} title={"Crunchy Fish"} text={"Crispy and crunchy fish fry, perfect as an appetizer."} to={"/fish"} />
            <CustomerCards img={paneerButterMasala} title={"Paneer Butter Masala"} text={"Rich and creamy paneer butter masala with a hint of spice."} to={"/paneer"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCustomer;


