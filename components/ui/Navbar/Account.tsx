// AccountDropdown.js
'use client';

import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
import { useState } from 'react';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`${s.link} text-sm`} // Removed bg-gray-200
        aria-label="Account"
      >
        Account
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg text-white">
          {' '}
          {/* Changed background to black and text color to white */}
          <div className="py-10 flex items-center justify-center">
            <SignOutButton />
            <button className={`${s.link} text-sm`}>Upgrade</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
