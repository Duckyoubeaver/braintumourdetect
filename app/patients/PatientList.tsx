'use client';

import styles from './Patient.module.css';
// @ts-ignore
import { FileObject } from '@supabase/storage-js';
import Link from 'next/link';
import React, { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';

interface PatientListProps {
  patients: FileObject[] | null;
  onDelete: (patientName: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onDelete }) => {
  const [loading, setLoading] = useState<string | null>(null);

  if (!patients || patients.length === 0) {
    return (
      <p className="text-black ml-[85px]">
        Click the blue add button to add your first patient folder.
      </p>
    );
  }

  const handleDelete = async (patientName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      window.confirm(`Are you sure you want to delete ${patientName}'s folder?`)
    ) {
      setLoading(patientName);
      try {
        const response = await fetch(
          `/api/patients/${encodeURIComponent(patientName)}`,
          {
            method: 'DELETE'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete patient');
        }

        onDelete(patientName);
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient. Please try again.');
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeader}></div>
      <div className={styles.patientGrid}>
        {patients.map((patient, index) => (
          <div key={index} className={styles.patientButtonWrapper}>
            <Link
              href={`/patients/${encodeURIComponent(patient.name)}`}
              className={`${styles.cardButton} text-black`}
            >
              <span className={styles.cardTitle}>{patient.name}</span>
            </Link>
            <button
              onClick={(e) => handleDelete(patient.name, e)}
              className={styles.deleteButton}
              aria-label={`Delete ${patient.name}`}
              disabled={loading === patient.name}
            >
              {loading === patient.name ? (
                <FaSpinner className={styles.spinner} />
              ) : (
                <TiDeleteOutline />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
