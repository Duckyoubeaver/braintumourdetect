// components/File.tsx
'use client';
import React, { useState, useRef, useCallback } from 'react';
import s from './Navbar.module.css';

const FileDropdown: React.FC = React.memo(() => {
  console.log('FileDropdown is rendered'); // Check if the component re-renders
  return (
    <div className={s.dropdowncontent}>
      <button onClick={() => console.log('Action 1')}>Action 1</button>
      <button onClick={() => console.log('Action 2')}>Action 2</button>
      <button onClick={() => console.log('Action 3')}>Action 3</button>
    </div>
  );
});

const Toolbar: React.FC = () => {
  const [fileDropdownOpen, setFileDropdownOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = useCallback((tab: string) => {
    setFileDropdownOpen((prev) => (tab === 'file' ? !prev : false));
    setEditDropdownOpen((prev) => (tab === 'edit' ? !prev : false));
  }, []);

  return (
    <div className="hidden space-x-0 lg:block">
      <div
        className={`${s.link} ${s.dropdowncontainer} text-sm`}
        ref={dropdownRef}
      >
        <div>
          <button onClick={() => handleButtonClick('file')}>File</button>
          {fileDropdownOpen && <FileDropdown />}
        </div>
      </div>
      <div
        className={`${s.link} ${s.dropdowncontainer} text-sm`}
        ref={dropdownRef}
      >
        <div>
          <button onClick={() => handleButtonClick('edit')}>Edit</button>
          {editDropdownOpen && <FileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
