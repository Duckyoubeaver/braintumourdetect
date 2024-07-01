// // app/api/upload/route.ts
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   const supabase = createServerComponentClient({ cookies });

//   // Get the current user
//   const {
//     data: { user }
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   let body;
//   try {
//     body = await request.json();
//   } catch (error) {
//     console.error('Error parsing request body:', error);
//     return NextResponse.json(
//       { error: 'Invalid request body' },
//       { status: 400 }
//     );
//   }

//   const { file, fileName } = body;

//   if (!file || !fileName) {
//     return NextResponse.json(
//       { error: 'Missing file or fileName' },
//       { status: 400 }
//     );
//   }

//   try {
//     const buffer = Buffer.from(file, 'base64');

//     // Use the user's ID as the top-level folder name
//     const filePath = `${user.id}/${fileName}`;

//     const { data, error } = await supabase.storage
//       .from('scan')
//       .upload(filePath, buffer, {
//         contentType: 'image/jpeg',
//         cacheControl: '3600',
//         upsert: false
//       });

//     if (error) {
//       throw error;
//     }

//     return NextResponse.json({ data });
//   } catch (error: any) {
//     console.error('Error uploading file:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// app/api/upload/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Get the current user
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { file, fileName, patientName } = body;

  if (!file || !fileName || !patientName) {
    return NextResponse.json(
      { error: 'Missing file, fileName, or patientName' },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(file, 'base64');

    // Use the user's ID as the top-level folder, then patient name, then the file
    const filePath = `${user.id}/${encodeURIComponent(
      patientName
    )}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('scan')
      .upload(filePath, buffer, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
