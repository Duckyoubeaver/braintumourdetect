'use client';

import s from './Patient.module.css';
import { supabase } from '@/app/supabase-client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
}

interface FormData {
  name: string;
  age: string;
  gender: string;
}

const PatientComponent: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    // Fetch existing patients
    const fetchPatients = async () => {
      try {
        const { data, error } = await supabase.from('patients').select('*');
        if (error) throw error;
        setPatients(data as Patient[]);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([formData]);
      if (error) throw error;

      setPatients([...patients, data[0]]);
      setFormData({
        name: '',
        age: '',
        gender: ''
      });

      // Create folder in Supabase
      const radiologistUserId = 'your-radiologist-user-id'; // Replace with actual user ID
      const newFolderName = `${data[0].id}/supabase-folder`;

      const { error: storageError } = await supabase.storage
        .from('scan')
        .upload(`${radiologistUserId}/${newFolderName}/`, new Blob([]));

      if (storageError) {
        console.error('Error creating folder:', storageError);
      } else {
        console.log('Folder created successfully');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div
      className={`${s.background} w-screen h-screen flex flex-col items-center justify-center`}
    >
      {/* Form to add new patients */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className={`${s['text-black']} text-xl mb-4`}>Add New Patient</h2>
        <div className="mb-4">
          <label className={`${s['text-black']} block mb-2`}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${s['text-black']} border p-2 w-full`}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`${s['text-black']} block mb-2`}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`${s['text-black']} border p-2 w-full`}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`${s['text-black']} block mb-2`}>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`${s['text-black']} border p-2 w-full`}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Patient
        </button>
      </form>

      {/* Display existing patients */}
      <h2 className={`${s['text-black']} text-xl mb-4`}>Existing Patients</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {patients.map((patient) => (
          <div key={patient.id} className="border p-4">
            <h3 className={`${s['text-black']} text-lg mb-2`}>
              {patient.name}
            </h3>
            <p className={s['text-black']}>Age: {patient.age}</p>
            <p className={s['text-black']}>Gender: {patient.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientComponent;
