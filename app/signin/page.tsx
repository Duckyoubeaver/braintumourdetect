import AuthUI from './AuthUI';
import { getSession } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await getSession();
  //Changing Authentication Route redirect to scan
  if (session) {
    return redirect('/patients');
  }

  return (
    <div className="flex justify-center h-screen bg-white overflow-y-hidden">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
