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
      <button onClick={handleButtonClick}>File</button>
      {isDropdownOpen && (
        <div className={s.dropdowncontent}>
          {/* Your dropdown content goes here */}
          <button onClick={() => console.log('Action 1')}>Action 1</button>
          <button onClick={() => console.log('Action 2')}>Action 2</button>
          <button onClick={() => console.log('Action 3')}>Action 3</button>
        </div>
      )}
    </div>
  );
};

export default File;
