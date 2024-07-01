import s from './Patient.module.css';
import PatientManager from './PatientManager';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Patient = async () => {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  if (!session) {
    redirect('/signin');
  }

  const user = session.user;

  const supabase = createServerComponentClient({ cookies });

  const { data: initialPatients, error } = await supabase.storage
    .from('scan')
    .list(user.id);

  if (error) {
    console.error('Error fetching patients:', error);
  }

  return (
    <div
      className={`${s.background} w-screen h-screen flex flex-col items-center justify-start p-8`}
    >
      <h1 className="text-2xl font-bold mb-6">Your Patients</h1>
      <PatientManager userId={user.id} initialPatients={initialPatients} />
    </div>
  );
};

export default Patient;
