// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function DELETE(request: NextRequest) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { searchParams } = new URL(request.url);
//   const fileName = searchParams.get('fileName') || '';

//   // Log received parameters
//   console.log('Received DELETE request with parameters:', {
//     fileName
//   });

//   const {
//     data: { session }
//   } = await supabase.auth.getSession();

//   if (!session) {
//     console.log('Unauthorized attempt to delete image:', {
//       fileName
//     });
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     // Construct the path using the dynamic patientName
//     const folderPath = 'Folder'; // Adjust if necessary
//     const filePath = `${session.user.id}/${folderPath}/${fileName}`; // Use dynamic patientName

//     console.log('Attempting to delete image with parameters:', {
//       folderPath,
//       filePath
//     });

//     // Remove the specific file
//     const { data, error } = await supabase.storage
//       .from('scan')
//       .remove([filePath]);

//     if (error) {
//       console.error('Error deleting files:', error);
//       throw error;
//     }
//     if (error) {
//       console.error('Error deleting image:', error, { folderPath, filePath });
//       throw error;
//     }

//     console.log('Successfully deleted image:', { folderPath, filePath });
//     return NextResponse.json(
//       { message: 'Image file deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting image file:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete image file' },
//       { status: 500 }
//     );
//   }
// }

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName') || '';
  const folderPath = searchParams.get('folderPath') || '';

  // Log received parameters
  console.log('Received DELETE request with parameters:', {
    folderPath,
    fileName
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    console.log('Unauthorized attempt to delete image:', {
      folderPath,
      fileName
    });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Construct the path using the dynamic patientName and folderPath
    const filePath = `${session.user.id}/${folderPath}/${fileName}`;

    console.log('Attempting to delete image with parameters:', {
      filePath
    });

    // Remove the specific file
    const { error } = await supabase.storage.from('scan').remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error, { filePath });
      throw error;
    }

    console.log('Successfully deleted image:', { filePath });
    return NextResponse.json(
      { message: 'Image file deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting image file:', error);
    return NextResponse.json(
      { error: 'Failed to delete image file' },
      { status: 500 }
    );
  }
}
