'use server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { connectToDB } from '@/db';
import { Recruiter, RecruitersProps } from '@/db/models/recruiters.model';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function add_recruiters(formdata: FormData, urls: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  const name = formdata.get('name');
  if (!name) {
    throw new Error('Please fill all the fields');
  }
  if (!urls) {
    throw new Error('Please upload an image');
  }
  try {
    await connectToDB();
    await Recruiter.create({ company: name, url: urls });
  } catch (error) {
    throw new Error('Error while creating recruiters');
  }
  revalidatePath('/recruiters');
  redirect('/recruiters');
}

export async function get_recruiters_by_id(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  let stats: RecruitersProps | null;
  try {
    await connectToDB();
    stats = await Recruiter.findById(id).select('-__v');
  } catch (error) {
    throw new Error('Error while fetching recruiters');
  }
  if (!stats) {
    throw new Error('Recruiter not found');
  }
  return stats;
}

export async function update_recruiters({
  formdata,
  id,
  urls,
}: {
  formdata: FormData;
  id: string;
  urls: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  const name = formdata.get('name');
  if (!name) {
    throw new Error('Please fill all the fields');
  }
  if (!urls) {
    throw new Error('Please upload an image');
  }
  try {
    await connectToDB();
    await Recruiter.findByIdAndUpdate(id, { company: name, url: urls });
  } catch (error) {
    throw new Error('Error while updating recruiters');
  }
  revalidatePath('/recruiters');
  redirect('/recruiters');
}

export async function get_recruiters() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  try {
    await connectToDB();
    const stats: RecruitersProps[] = await Recruiter.find({}).select('-__v');
    return stats;
  } catch (error) {
    throw new Error('Error while fetching recruiters');
  }
}

export async function delete_recruiter(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  if (!id) {
    throw new Error('Please provide an id');
  }
  try {
    await connectToDB();
    await Recruiter.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error while deleting recruiter');
  }
  revalidatePath('/recruiters');
  redirect('/recruiters');
}
