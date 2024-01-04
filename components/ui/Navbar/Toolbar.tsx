// components/File.tsx

'use client';

import React, { useState, useEffect } from 'react';
import s from './Navbar.module.css';

// components/File.tsx

// ... (import statements)

const Toolbar: React.FC = () => {
  // Maintain individual states for each dropdown
  const [fileDropdownOpen, setFileDropdownOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  // Add more states for other tabs if needed

  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleButtonClick = (tab: string) => {
    // Close the dropdown if the same tab is clicked again
    if (activeTab === tab) {
      setFileDropdownOpen(false);
      setEditDropdownOpen(false);
      setActiveTab(null);
      return;
    }

    // Toggle the state for the corresponding dropdown
    switch (tab) {
      case 'file':
        setFileDropdownOpen(true);
        setEditDropdownOpen(false); // Close other dropdowns if needed
        setActiveTab('file');
        break;
      case 'edit':
        setEditDropdownOpen(true);
        setFileDropdownOpen(false); // Close other dropdowns if needed
        setActiveTab('edit');
        break;
      // Add more cases for other tabs if needed
      default:
        break;
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const toolbar = document.querySelector(`.${s.link}`);

    // Check if the click is outside the toolbar component
    if (!toolbar?.contains(target)) {
      setFileDropdownOpen(false);
      setEditDropdownOpen(false);
      // Close other dropdowns if needed
      setActiveTab(null); // Clear activeTab
    }
  };

  useEffect(() => {
    // Add a mousedown event listener to the document to close the dropdown on outside click
    document.addEventListener('mousedown', handleDocumentClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div className="hidden space-x-0 lg:block">
      {/* File Tab */}
      <div className={`${s.link} ${s.dropdowncontainer} text-sm`}>
        <div>
          <button onClick={() => handleButtonClick('file')}>File</button>
          {fileDropdownOpen && (
            <div className={s.dropdowncontent}>
              <button onClick={() => console.log('Action 1')}>Action 1</button>
              <button onClick={() => console.log('Action 2')}>Action 2</button>
              <button onClick={() => console.log('Action 3')}>Action 3</button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Tab */}
      <div className={`${s.link} ${s.dropdowncontainer} text-sm`}>
        <div>
          <button onClick={() => handleButtonClick('edit')}>Edit</button>
          {editDropdownOpen && (
            <div className={s.dropdowncontent}>
              <button onClick={() => console.log('Action 1')}>Action 1</button>
              <button onClick={() => console.log('Action 2')}>Action 2</button>
              <button onClick={() => console.log('Action 3')}>Action 3</button>
            </div>
          )}
        </div>
      </div>

      {/* Add more tabs in a similar manner if needed */}
    </div>
  );
};

export default Toolbar;
