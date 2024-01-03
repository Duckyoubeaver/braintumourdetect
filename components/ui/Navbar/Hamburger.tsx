// Import necessary modules and components
'use client';

import React, { useState } from 'react';
import s from './Navbar.module.css'; // Import your CSS module
import { RxHamburgerMenu } from 'react-icons/rx';

const Hamburger = () => {
  // State to manage rotation
  const [isRotated, setIsRotated] = useState(false);

  // Click handler
  const handleButtonClick = () => {
    setIsRotated(!isRotated);
  };

  // Dynamically set rotation class based on state
  const rotationClass = isRotated ? s.rotate : '';

  // Render the component
  return (
    <div className={`${s.buttonContainer} ${rotationClass}`}>
      <button
        className={`${s.button} text-base`}
        title="More"
        onClick={handleButtonClick}
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
};

// Export the component
export default Hamburger;
