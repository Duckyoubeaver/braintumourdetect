import { Suspense } from 'react';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Scans from './Server';

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
      {/* @ts-expect-error Server Component */}
      <Scans userId={user.id} />
    </Suspense>
  );
}
