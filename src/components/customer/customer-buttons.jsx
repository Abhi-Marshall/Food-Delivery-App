import React from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from '../LogoutButton';

function CustomerButtons(props) {
  return (
    <div className="col-md-8 text-center">
      <h1>Welcome, {props.wlcm}!</h1>
      <div className="btn-group mt-4" role="group">
        <button type="button" className="btn btn-custom-customer btn-fish-customer">
          <NavLink to="/fish" className="text-decoration-none text-white"> Fish </NavLink>
        </button>
        <button type="button" className="btn btn-custom-customer btn-chicken-customer">
          <NavLink to="/chicken" className="text-decoration-none text-white"> Chicken </NavLink>
        </button>
        <button type="button" className="btn btn-custom-customer btn-egg-customer">
          <NavLink to="/egg" className="text-decoration-none text-white"> Egg </NavLink>
        </button>
        <button type="button" className="btn btn-custom-customer btn-paneer-customer">
          <NavLink to="/paneer" className="text-decoration-none text-white"> Paneer </NavLink>
        </button>
        <button type="button" className="btn btn-custom-customer btn-order-customer">
          <NavLink to="/my-order" className="text-decoration-none text-white"> My Order </NavLink>
        </button>
        <button type="button" className="btn btn-custom-customer btn-profile-customer">
          <NavLink to="/profile" className="text-decoration-none text-white"> Profile </NavLink>
        </button>
        <LogoutButton />
      </div>
    </div>
  );
}

export default CustomerButtons;
