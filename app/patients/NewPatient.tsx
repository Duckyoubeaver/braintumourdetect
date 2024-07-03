'use client';

import React, { useState } from 'react';

interface NewPatientFormProps {
  userId: string;
  onPatientAdded: () => void;
}

const NewPatientForm: React.FC<NewPatientFormProps> = ({
  userId,
  onPatientAdded
}) => {
  const [patientName, setPatientName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientName, userId })
    });

    if (response.ok) {
      setPatientName('');
      onPatientAdded();
    } else {
      console.error('Failed to create patient');
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
