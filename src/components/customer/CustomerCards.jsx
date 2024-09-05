import React from 'react';
import { NavLink } from 'react-router-dom';

function CustomerCards(props) {
  return (
    <div className="card-custom-customer">
      <img src={props.img} className="card-img-top-customer" alt={props.title} />
      <div className="card-body-customer">
        <h5 className="card-title-customer">{props.title}</h5>
        <p className="card-text-customer">{props.text}</p>
        <NavLink to={props.to} className='btn btn-success rounded-pill'>Explore</NavLink>
      </div>
    </div>
  );
}

export default CustomerCards;
