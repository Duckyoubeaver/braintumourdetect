// components/File.tsx
import React, { useState } from 'react';
import s from './Navbar.module.css';

interface FileProps {
  isOpen: boolean;
  onClick: () => void;
}

const DropdownContent: React.FC = () => {
  return (
    <div className={s.dropdowncontent}>
      <button onClick={() => console.log('Action 1')}>Action 1</button>
      <button onClick={() => console.log('Action 2')}>Action 2</button>
      <button onClick={() => console.log('Action 3')}>Action 3</button>
    </div>
  );
};

const Edit: React.FC<FileProps> = ({ isOpen, onClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onClick(); // Notify the parent component that the "File" button is clicked
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={s.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button onClick={handleButtonClick}>Edit</button>
      {isDropdownOpen && <DropdownContent />}
    </div>
  );
};

export default Edit;
