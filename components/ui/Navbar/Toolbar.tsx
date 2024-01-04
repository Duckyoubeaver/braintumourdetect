'use client';
import React, { useState } from 'react';
import File from './File';
import Edit from './Edit';
import s from './Navbar.module.css';

const Toolbar: React.FC = () => {
  const [fileOpen, setFileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleFileClick = () => {
    setFileOpen(!fileOpen);
    if (editOpen) {
      setEditOpen(false);
    }
  };

  const handleEditClick = () => {
    setEditOpen(!editOpen);
    if (fileOpen) {
      setFileOpen(false);
    }
  };

  const handleOutsideClick = () => {
    if (fileOpen || editOpen) {
      setFileOpen(false);
      setEditOpen(false);
    }
  };

  return (
    <div onClick={handleOutsideClick}>
      <div className={`${s.link} ${s.dropdowncontainer} text-sm`}>
        <File isOpen={fileOpen} onClick={handleFileClick} />
      </div>
      <div className={`${s.link} ${s.dropdowncontainer} text-sm`}>
        <Edit isOpen={editOpen} onClick={handleEditClick} />{' '}
      </div>
    </div>
  );
};

export default Toolbar;
