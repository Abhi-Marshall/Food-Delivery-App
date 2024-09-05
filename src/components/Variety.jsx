import React from 'react';
import VarietyBox from './Variety-box';
import imgBiryani from "../images/explore-biryani.jpg";
import imgPaneer from "../images/paneer-explore.png";
import foodDelievered from "../images/food-delievered.webp";

function Variety() {
  return <>
  <div className='card-box'>
      <div className="variety-box">
        <VarietyBox 
          img={imgBiryani} 
          title={"Explore Biryani"} 
          text={"Discover the richness of Biryani flavors at your fingertips."}
          link={"Tap to Biryani & more"} 
          to={"/chickenHome"}
        />
      </div>

      <div className="variety-box">
        <VarietyBox 
          img={imgPaneer} 
          title={"Explore Paneer Dishes"}
          text={"Indulge in the savory delights of Paneer with our variety of dishes."}
          link={"Taste Of Paneer"}
          to={"/paneerHome"}  
        />
      </div>
      
      <div className="variety-box">
        <VarietyBox 
          img={foodDelievered} 
          title={"Taste the Convenience"} 
          text={"Try us out! Delicious food and speedy groceries are at your fingertips. Go ahead!"}
          link={"Order Now"} 
          to={"/orderExplore"}
        />
      </div>
    </div>
  </>
}

export default Variety

