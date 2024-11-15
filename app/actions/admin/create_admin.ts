'use server';
import { connectToDB } from '@/db';
interface createAdminProps {
  email: string;
  name: string;
  password: string;
}

export default async function createAdmin({
  email,
  name,
  password,
}: createAdminProps) {
  if (!email || !name || !password) {
    throw new Error('All Fields are required!');
  }
  try {
    await prisma.admin.create({ data: { email, name, password } });
  } catch (error) {
    throw new Error('Something went wrong!');
  }
}
