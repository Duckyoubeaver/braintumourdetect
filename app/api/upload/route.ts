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

  // Check if the file is a JPEG/JPG
  const isJpeg =
    fileName.toLowerCase().endsWith('.jpeg') ||
    fileName.toLowerCase().endsWith('.jpg');
  const isValidMimeType = file.startsWith('/9j/'); // JPEG files start with this magic number in base64

  if (!isJpeg || !isValidMimeType) {
    return NextResponse.json(
      { error: 'Only JPEG/JPG images are allowed' },
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
