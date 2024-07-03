import ScansClient from './ScansClient';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface ScansProps {
  userId: string;
  patientName: string;
}

interface Scan {
  name: string;
  dateAdded: string;
  url: string;
}

async function getScansData(
  userId: string,
  patientName: string
): Promise<Scan[]> {
  const supabase = createServerComponentClient({ cookies });
  const folderPath = `${userId}/${patientName}`;

  console.log('Fetching scans from folder path:', folderPath);

  const { data: files, error } = await supabase.storage
    .from('scan')
    .list(folderPath, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

  if (error) {
    console.error('Error listing files:', error);
    return [];
  }

  if (!files || files.length === 0) {
    console.log('No files found in the specified folder:', folderPath);
    return [];
  }

  console.log('Files found:', files);

  const scans = await Promise.all(
    files
      .filter((file) => !file.name.endsWith('.keep')) // Exclude .keep files
      .map(async (file) => {
        console.log('Processing file:', file.name);

        // @ts-expect-error

        const { data: publicUrlData, error: urlError } = await supabase.storage
          .from('scan')
          .getPublicUrl(`${folderPath}/${file.name}`);

        if (urlError) {
          console.error(
            'Error getting public URL for file:',
            file.name,
            urlError
          );
          return null;
        }

        return {
          name: file.name,
          dateAdded:
            file.created_at || file.updated_at || new Date().toISOString(),
          url: publicUrlData.publicUrl
        };
      })
  );

  // Filter out any null results from failed public URL fetches
  return scans.filter((scan): scan is Scan => scan !== null);
}

export default async function Scans({ userId, patientName }: ScansProps) {
  console.log('Fetching scans for user:', userId, 'and patient:', patientName);
  const scansData = await getScansData(userId, patientName);
  console.log('Scans data:', scansData); // Detailed logging of fetched scan data

  return <ScansClient initialScans={scansData} />;
}
