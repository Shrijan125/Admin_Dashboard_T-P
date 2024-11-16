'use server';
import { connectToDB } from '@/db';
import { Alumni, AlumniProp } from '@/db/models/alumni.model';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function add_alumni(formdata: FormData, urls: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  const name = formdata.get('name');
  const role = formdata.get('role');
  const company = formdata.get('company');
  const year = formdata.get('academicyear');

  if (!urls) {
    throw new Error('Please upload an image');
  }

  if (!name || !role || !company || !year) {
    throw new Error('Please fill all the fields');
  }
  try {
    await connectToDB();
    await Alumni.create({ name, role, company, year, image: urls });
  } catch (error) {
    throw new Error('Error while creating alumni');
  }
  revalidatePath('/alumni');
  redirect('/alumni');
}

export async function get_alumni() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  try {
    await connectToDB();
    const stats: AlumniProp[] = await Alumni.find({}).select('-__v');
    return stats;
  } catch (error) {
    throw new Error('Error while fetching alumni');
  }
}

export async function get_alumni_by_id(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  let stats: AlumniProp | null;
  try {
    await connectToDB();
    stats = await Alumni.findById(id).select('-__v');
  } catch (error) {
    throw new Error('Error while fetching alumni');
  }
  if (!stats) {
    throw new Error('Alumni not found');
  }
  return stats;
}

export async function update_alumni({
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
  const role = formdata.get('role');
  const company = formdata.get('company');
  const year = formdata.get('academicyear');
  if (!urls) {
    throw new Error('Please upload an image');
  }

  if (!name || !role || !company || !year) {
    throw new Error('Please fill all the fields');
  }

  try {
    await connectToDB();
    await Alumni.findByIdAndUpdate(id, {
      name,
      role,
      company,
      year,
      image: urls,
    });
  } catch (error) {
    throw new Error('Error while updating alumni');
  }
  revalidatePath('/alumni');
  redirect('/alumni');
}

export async function delete_alumni(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  if (!id) {
    throw new Error('Id is required!');
  }
  try {
    await connectToDB();
    await Alumni.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete user!');
  }
  revalidatePath('/btech_statistics');
}
