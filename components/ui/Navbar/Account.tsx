// AccountDropdown.js
'use client';

import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
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
        className={`${s.link} z-100`}
        aria-label="Account"
      >
        Account
      </button>
      {isOpen && (
        <div className="absolute right-0 z-20 w-90 bg-white rounded-md shadow-lg text-white">
          <div className="py-2 flex items-center justify-center">
            <Link href="/account" className={`${s.link}`}>
              Account
            </Link>
            <SignOutButton />
            <button className={`${s.link}`}>Upgrade</button>
            <Link href="/" className={`${s.link}`}>
              Pricing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
