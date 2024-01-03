import React, { useState, FC } from 'react';
import s from './Navbar.module.css';
import './SubmenuComponent.css';

interface SubmenuProps {
  menuName: string;
  options: string[];
  handleOptionClick: (option: string) => void;
}

const SubmenuComponent: FC<SubmenuProps> = ({
  menuName,
  options,
  handleOptionClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.submenu}>
      <button onClick={toggleSubMenu}>{menuName}</button>
      {isOpen && (
        <div>
          {options.map((option, index) => (
            <a key={index} href="#" onClick={() => handleOptionClick(option)}>
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmenuComponent;
