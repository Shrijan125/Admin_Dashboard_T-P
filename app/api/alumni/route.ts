import { connectToDB } from '@/db';
import { Alumni, AlumniProp } from '@/db/models/alumni.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    const data: AlumniProp[] = await Alumni.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to get Data' },
      { status: 500 },
    );
  }
}
