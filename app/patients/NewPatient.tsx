'use client';

import React, { useState } from 'react';

interface NewPatientFormProps {
  userId: string;
}

const NewPatientForm: React.FC<NewPatientFormProps> = ({ userId }) => {
  const [patientName, setPatientName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patientName, userId })
      });

      if (response.ok) {
        setPatientName('');
      } else {
        console.error('Failed to create patient:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="bg-white text-black" onSubmit={handleSubmit}>
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="Enter patient name"
        required
      />
      <button type="submit">Create Patient</button>
    </form>
  );
};

export default NewPatientForm;
