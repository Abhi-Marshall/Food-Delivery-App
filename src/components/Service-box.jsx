import React from 'react';
import {NavLink} from "react-router-dom";

function ServiceBox(props) {
    return <>
        <div className="card bg-black text-white text-center">
            <img width={"20px"} height={"160px"} src={props.img} className="card-img-top" alt="delievery person" />
            <div className="card-body">
                <h2 className="card-title text-info"> {props.title} </h2>
                <p className="card-text"> {props.text} </p>
                <NavLink to={props.to} className="btn btn-primary">{props.link} </NavLink>
            </div>
        </div>
    </>
}

export default ServiceBox;

