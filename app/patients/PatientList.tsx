// PatientList.tsx
'use client';

import styles from './Patient.module.css';
import { FileObject } from '@supabase/storage-js';
import Link from 'next/link';
import React from 'react';

interface PatientListProps {
  patients: FileObject[] | null;
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  if (!patients || patients.length === 0) {
    return <p>No patients found.</p>;
  }

  return (
    <div className={styles.patientGrid}>
      {patients.map((patient, index) => (
        <Link
          key={index}
          href={`/patients/${encodeURIComponent(patient.name)}`}
          className={styles.patientButton}
        >
          {patient.name}
        </Link>
      ))}
    </div>
  );
};

export default PatientList;
