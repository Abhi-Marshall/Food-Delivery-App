import React, { useState, useEffect } from 'react';
import img from '../images/baby-food.png';

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const updatePosition = (e) => {
        // setPosition({ x: e.clientX, y: e.clientY });
        setPosition({ x: e.pageX, y: e.pageY });
      };
  
      window.addEventListener('pointermove', updatePosition);
  
      return () => {
        window.removeEventListener('pointermove', updatePosition);
      };
    }, []);
  
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: '40px',
            height: '40px',
            marginLeft: '10px',
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            pointerEvents: "none", // Makes sure the div doesn't interfere with mouse events
          }}
        />
      </div>
    );
  };
  
  export default MouseFollower;

//use effect:
//Side Effects Management: It lets you perform side effects in a function component. Common side effects include data fetching, direct DOM manipulations, and setting up subscriptions.

//clientX and clientY , pageX and pageY are properties that come with mousemove and pointer move.
//client moves with the mouse but when scrolled then it gets apart with the mouse.
//page : even on scroll, it stays with the mouse.