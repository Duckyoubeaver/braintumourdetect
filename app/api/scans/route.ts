import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const patientName = searchParams.get('patientName');

  if (!userId || !patientName) {
    return NextResponse.json(
      { error: 'Missing userId or patientName' },
      { status: 400 }
    );
  }

  const supabase = createRouteHandlerClient({ cookies });

  const folderPath = `${userId}/${patientName}`;
  const { data: files, error } = await supabase.storage
    .from('scan')
    .list(folderPath, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const scans = await Promise.all(
    files
      .filter((file) => !file.name.endsWith('.keep'))
      .map(async (file) => {
        const { data: publicUrlData } = await supabase.storage
          .from('scan')
          .getPublicUrl(`${folderPath}/${file.name}`);

        return {
          name: file.name,
          dateAdded: file.created_at || new Date().toISOString(),
          url: publicUrlData?.publicUrl || ''
        };
      })
  );

  return NextResponse.json(scans);
}
