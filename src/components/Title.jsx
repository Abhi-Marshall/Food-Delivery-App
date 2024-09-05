import React from 'react';
import img from "../../public/favicon.png";
import TitleButton from './Title-button';

function Title() {
  const logIn = "p-2 px-4 rounded-pill btn-primary border-0 position-relative z-3";
  const signUp = "mx-2 p-2 px-4 rounded-pill btn-danger border-0 position-relative z-3";
  return <>
    <div className="title">
      <nav className="d-flex justify-content-between mx-auto align-items-center py-5 w-75">
        <div> <img src={img} alt="logo" width={80} height={80} className="position-relative z-3"/> </div>
        <div>
          <TitleButton classes={logIn} text={"Sign In"} refer={"/login"}/>
          <TitleButton classes={signUp} text={"Sign Up"} refer={"/register"}/>
        </div>
      </nav>

      <div id="title-opacity"></div>

      <h1 className="text-center text-warning position-relative z-5">Welcome to <span className="text-danger">The</span> <span className="text-primary">Flavor Flyer</span></h1>
      <p className="text-center text-white position-relative z-3 text"> Food is symbolic of love when words are inadequate. </p>
    </div>
  </>
}

export default Title

