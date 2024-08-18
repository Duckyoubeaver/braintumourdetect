import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { patientName: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const patientName = params.patientName;

  // Log received parameters
  console.log('Received DELETE request with patientName:', patientName);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    console.log('Unauthorized attempt to delete patient folder content:', {
      patientName
    });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Attempting to list files in folder for patient:', patientName);

    // List all files in the folder
    const { data: listResponse, error: listError } = await supabase.storage
      .from('scan')
      .list(`${session.user.id}/${patientName}`, { limit: 1000 });

    if (listError) {
      console.error('Error listing files:', listError);
      throw listError;
    }

    // Log the files found
    console.log('Files listed for deletion:', listResponse);

    // Prepare the list of file paths
    const filePaths = listResponse.map(
      (file) => `${session.user.id}/${patientName}/${file.name}`
    );

    // Log the file paths to be deleted
    console.log('File paths to be deleted:', filePaths);

    // Remove files
    const { data, error } = await supabase.storage
      .from('scan')
      .remove(filePaths);

    if (error) {
      console.error('Error deleting files:', error);
      throw error;
    }

    console.log('Successfully deleted patient folder content:', data);

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
