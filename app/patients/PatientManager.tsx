'use client';

import styles from './Patient.module.css';
import NewPatientPopup from './NewPatientPopup';
import PatientList from './PatientList';
// @ts-ignore

import { FileObject } from '@supabase/storage-js';
import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

interface PatientManagerProps {
  initialPatients: FileObject[] | null;
}

const PatientManager: React.FC<PatientManagerProps> = ({ initialPatients }) => {
  const [patients, setPatients] = useState<FileObject[] | null>(
    initialPatients
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients');
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handlePatientAdded = async (name: string) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patientName: name })
      });

      if (!response.ok) {
        throw new Error('Failed to create patient');
      }

      await fetchPatients();
      alert('Patient added successfully!');
    } catch (error) {
      console.error('Failed to create patient:', error);
      alert('Patient names must be unique. Please use a different name.');
    } finally {
      setIsPopupOpen(false);
    }
  };

  const handlePatientDeleted = (deletedPatientName: string) => {
    setPatients((prevPatients) =>
      prevPatients
        ? prevPatients.filter((patient) => patient.name !== deletedPatientName)
        : null
    );
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <h2 className={styles.sectionTitle}>Patient Folders</h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className={styles.addButton}
            aria-label="Add new patient"
          >
            <IoIosAddCircle size={24} />
          </button>
        </div>
        {isPopupOpen && (
          <NewPatientPopup
            onAddPatient={handlePatientAdded}
            onClose={closePopup}
          />
        )}
        <PatientList patients={patients} onDelete={handlePatientDeleted} />
      </div>
    </div>
  );
};

export default PatientManager;
