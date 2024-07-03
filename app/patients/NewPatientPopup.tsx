'use client';

import React, { useState, useEffect, useRef } from 'react';

interface NewPatientPopupProps {
  onAddPatient: (name: string) => void;
  onClose: () => void;
}

const NewPatientPopup: React.FC<NewPatientPopupProps> = ({
  onAddPatient,
  onClose
}) => {
  const [name, setName] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPatient(name.trim());
      setName('');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg p-6 w-96 transform transition-all duration-300 ease-in-out"
      >
        <h3 className="text-xl font-bold mb-4 text-black">
          New Patient Folder
        </h3>
        <form className="text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="mt-4 flex justify-end space-x-2 items-center">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transform transition-transform duration-300 ease-in-out hover:rotate-12"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transform transition-transform duration-300 ease-in-out hover:rotate-12"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatientPopup;
