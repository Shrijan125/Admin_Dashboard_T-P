import { connectToDB } from '@/db';
import { Recruiter, RecruitersProps } from '@/db/models/recruiters.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    const data: RecruitersProps[] = await Recruiter.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to get Data' },
      { status: 500 },
    );
  }
}
