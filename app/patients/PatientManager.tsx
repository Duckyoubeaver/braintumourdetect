// PatientManager.tsx
'use client';

import NewPatientForm from './NewPatient';
import styles from './Patient.module.css';
import PatientList from './PatientList';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FileObject } from '@supabase/storage-js';
import React, { useState } from 'react';

interface PatientManagerProps {
  userId: string;
  initialPatients: FileObject[] | null;
}

const PatientManager: React.FC<PatientManagerProps> = ({
  userId,
  initialPatients
}) => {
  const [patients, setPatients] = useState<FileObject[] | null>(
    initialPatients
  );
  const supabase = createClientComponentClient();

  const fetchPatients = async () => {
    const { data, error } = await supabase.storage.from('scan').list(userId);

    if (error) {
      console.error('Error fetching patients:', error);
    } else {
      setPatients(data);
    }
  };

  const handlePatientAdded = () => {
    fetchPatients();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Create New Patient</h2>
        <NewPatientForm userId={userId} onPatientAdded={handlePatientAdded} />
      </div>

      <div className={styles.listSection}>
        <h2 className={styles.sectionTitle}>Patient List</h2>
        <PatientList patients={patients} />
      </div>
    </div>
  );
};

export default PatientManager;
