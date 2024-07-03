import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { patientName: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const patientName = params.patientName;

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // List all files in the folder
    const { data: listResponse, error: listError } = await supabase.storage
      .from('scan')
      .list(`${session.user.id}/${patientName}`, { limit: 1000 });

    if (listError) {
      throw listError;
    }

    // Prepare the list of file paths
    const filePaths = listResponse.map(
      (file) => `${session.user.id}/${patientName}/${file.name}`
    );

    // Remove files
    const { data, error } = await supabase.storage
      .from('scan')
      .remove(filePaths);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: 'Patient folder content deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting patient folder content:', error);
    return NextResponse.json(
      { error: 'Failed to delete patient folder content' },
      { status: 500 }
    );
  }
}
