import React from 'react';
import ServiceBox from './Service-box';
import delievery from "../images/delievery-person.svg";
import restaurent from "../images/restaurent.svg";
import exploreResto from "../images/explore-resto.svg";

function Service() {
  return <>
    <div className='container card-box'>
      <div className="row">
        <div className="col-md mb-5">
          <ServiceBox
            img={delievery}
            title={"Become a Dasher"}
            text={"As a delivery driver, make money and work on your schedule. Sign up in minutes."}
            link={"Register Yourself"}
            to = {"/register"} />
        </div>

        <div className="col-md mb-5">
          <ServiceBox
            img={restaurent}
            title={"Add Your Restaurent"}
            text={"Grow your business and reach new customers by partnering with us."}
            link={"Click To Add"} 
            to = {"/register"} />
        </div>

        <div className="col-md mb-5">
          <ServiceBox
            img={exploreResto}
            title={"View Our Restaurents"}
            text={"explore our diverse selection of restaurants."}
            link={"Enhance Your Taste"} 
            to = {"/restaurantDetails"} />
        </div>
      </div>
    </div>
  </>

}

export default Service

