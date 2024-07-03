'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './Patient.module.css';

interface PatientFile {
  id: string;
  name: string;
  recentScanUrl: string;
}

interface PatientFileNavProps {
  patients: PatientFile[];
}

const PatientFileNav: React.FC<PatientFileNavProps> = ({ patients }) => {
  return (
    <div className={s.fileGrid}>
      {patients.map((patient) => (
        <Link
          key={patient.id}
          href={`/patients/${patient.id}`}
          className={s.fileLink}
        >
          <div className={s.fileCard}>
            <div className={s.imageContainer}>
              <Image
                src={patient.recentScanUrl}
                alt={`${patient.name}'s recent brain scan`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={s.patientName}>
              <p>{patient.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PatientFileNav;
