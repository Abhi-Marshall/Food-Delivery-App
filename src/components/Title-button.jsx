import React from 'react';
import {NavLink} from "react-router-dom";

function TitleButton(props) {
  return <>
        <button className={props.classes}> <NavLink to={props.refer} className="text-decoration-none text-white" > {props.text} </NavLink> </button>  
    </>
}

export default TitleButton;