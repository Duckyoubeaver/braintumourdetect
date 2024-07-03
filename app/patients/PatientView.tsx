import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import PatientFileNav from './PatientFileNav';
import { SupabaseClient } from '@supabase/supabase-js';

interface PatientFileNavServerProps {
  userId: string;
}

interface PatientFile {
  id: string;
  name: string;
  recentScanUrl: string;
}

async function getPatients(userId: string): Promise<PatientFile[]> {
  const supabase = createServerComponentClient<any>({
    cookies
  }) as SupabaseClient;

  const { data: folders, error } = await supabase.storage
    .from('scan')
    .list(userId, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

  if (error) {
    console.error('Error listing folders:', error);
    return [];
  }

  if (!folders || folders.length === 0) {
    console.log('No patient folders found for user:', userId);
    return [];
  }

  const patients = await Promise.all(
    folders
      .filter((folder) => folder.name !== '.keep')
      .map(async (folder): Promise<PatientFile | null> => {
        const { data: files, error: filesError } = await supabase.storage
          .from('scan')
          .list(`${userId}/${folder.name}`, {
            limit: 1,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (filesError) {
          console.error(
            'Error listing files for patient:',
            folder.name,
            filesError
          );
          return null;
        }

        const recentScan = files && files.length > 0 ? files[0] : null;

        if (recentScan) {
          const { data: publicUrlData } = await supabase.storage
            .from('scan')
            .getPublicUrl(`${userId}/${folder.name}/${recentScan.name}`);

          return {
            id: folder.name,
            name: folder.name,
            recentScanUrl: publicUrlData.publicUrl
          };
        }

        return null;
      })
  );

  return patients.filter((patient): patient is PatientFile => patient !== null);
}

export default async function PatientFileNavServer({
  userId
}: PatientFileNavServerProps) {
  const patients = await getPatients(userId);
  return <PatientFileNav patients={patients} />;
}
