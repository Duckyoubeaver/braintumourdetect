import { createServerSupabaseClient } from '@/app/supabase-server';
import ScansClient from './ScansClient';

interface ScansProps {
  userId: string;
}

async function getScansData(userId: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.storage.from('scan').list(userId, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (error) {
    console.error('Error listing images:', error);
    return [];
  }

  return await Promise.all(
    data.map(async (file) => {
      const { data: publicUrlData } = await supabase.storage
        .from('scan')
        .getPublicUrl(`${userId}/${file.name}`);

      return {
        name: file.name,
        dateAdded: file.updated_at,
        url: publicUrlData.publicUrl
      };
    })
  );
}

export default async function Scans({ userId }: ScansProps) {
  const scansData = await getScansData(userId);

  return <ScansClient initialScans={scansData} />;
}
