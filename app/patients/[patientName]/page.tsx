import Scans from '../Scans';
import s from './PatientName.module.css';
import ImageUploadButton from '@/components/Upload';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

// @ts-expect-error
const PatientPage = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/signin');
  }

  const { patientName } = params;
  const decodedPatientName = decodeURIComponent(patientName);

  return (
    <div
      className={`${s.background} text-black flex flex-col items-center min-h-screen p-6`}
    >
      <h1 className="text-xl font-bold mb-6">{decodedPatientName}'s Scans</h1>
      <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
        <div className="w-full">
          <ImageUploadButton patientName={decodedPatientName} />
        </div>
        <div className="w-full">
          {/* @ts-expect-error - Reason for ignoring this error */}

          <Scans userId={session.user.id} patientName={decodedPatientName} />
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
