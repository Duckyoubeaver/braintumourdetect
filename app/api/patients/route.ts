import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: patients, error } = await supabase.storage
    .from('scan')
    .list(session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ patients });
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const patientName = body.patientName as string;

  if (!patientName) {
    return NextResponse.json(
      { error: 'Patient name is required' },
      { status: 400 }
    );
  }

  const folderPath = `${session.user.id}/${patientName}/`;

  const { data, error } = await supabase.storage
    .from('scan')
    .upload(folderPath + '.keep', new Blob(['']));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Patient folder created successfully' });
}
