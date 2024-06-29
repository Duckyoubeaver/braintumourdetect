import PatientComponent from './Patient';
import s from './Patient.module.css';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react';

const Patient = async () => {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }
  return (
    <div
      className={`${s.background} w-screen h-screen flex items-center justify-center`}
    >
      <PatientComponent />
    </div>
  );
};

export default Patient;
