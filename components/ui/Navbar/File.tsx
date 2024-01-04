// components/File.tsx

'use client';

import React, { useState, useEffect } from 'react';
import s from './Navbar.module.css';

const File: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    // Open the dropdown only if it was opened by a click event
    if (isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Close the dropdown only if it was opened by a click event
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownClick = () => {
    // Prevent closing the dropdown when clicking inside it
    setIsDropdownOpen(true);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    // Close the dropdown if the click is outside the component
    const target = event.target as HTMLElement;
    if (!target.closest(`.${s.dropdowncontent}`) && !target.closest('button')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add a click event listener to the document to close the dropdown on outside click
    document.addEventListener('click', handleDocumentClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button onClick={handleButtonClick}>File</button>
      {isDropdownOpen && (
        <div
          className={s.dropdowncontent}
          onMouseEnter={handleDropdownClick}
          onMouseLeave={handleMouseLeave}
        >
          <button onClick={() => console.log('Action 1')}>Action 1</button>
          <button onClick={() => console.log('Action 2')}>Action 2</button>
          <button onClick={() => console.log('Action 3')}>Action 3</button>
        </div>
      )}
    </div>
  );
};

export default File;
