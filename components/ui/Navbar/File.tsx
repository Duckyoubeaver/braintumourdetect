// components/File.tsx
'use client';

import React, { useState } from 'react';
import s from './Navbar.module.css';

const File: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button className={`${s.link} text-sm`} onClick={handleButtonClick}>
        File
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {/* Your dropdown content goes here */}
          <button onClick={() => console.log('Action 1')}>Action 1</button>
          <button onClick={() => console.log('Action 2')}>Action 2</button>
          <button onClick={() => console.log('Action 3')}>Action 3</button>
        </div>
      )}
      <style jsx>{`
        /* Add your styling here */
        .dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          width: 120px;
          background-color: #fff;
          border: 1px solid #ccc;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .dropdown-content button {
          width: 100%;
          padding: 10px;
          cursor: pointer;
          border: none;
          background: none;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default File;
