import Scans from './Server';
import UserIdDisplay from './UserIdDisplay';
import { createServerSupabaseClient } from '@/app/supabase-server';
import { Suspense } from 'react';

export default async function ScansPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to view your scans.</div>;
  }

  return (
    <Suspense fallback={<div>Loading scans...</div>}>
      <UserIdDisplay userId={user.id} />
      <Scans userId={user.id} />
    </Suspense>
  );
}
