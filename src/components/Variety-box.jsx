import React from 'react';
import { NavLink } from 'react-router-dom';

function VarietyBox(props) {
  return (
    <div className='d-flex' style={{width: "90vw", height: "50vh", margin: "auto", marginBottom: "150px"}}>
      <div style={{width: "600px", height: "500px"}}>
        <img width={"100%"} style={{objectFit: "cover"}} src={props.img} alt="img" className='px-5' />
      </div>
      <div style={{height: "90%"}} className="ml-5">
        <h2 className="font-weight-bold" style={{fontSize: "40px", color: "#FF6347"}}>{props.title}</h2>
        <p className='text-white'>{props.text}</p>
        <NavLink to={props.to} className="btn text-white" style={{backgroundColor:"#ef4f5f"}}>{props.link}</NavLink>
      </div>
    </div>
  );
}

export default VarietyBox;

