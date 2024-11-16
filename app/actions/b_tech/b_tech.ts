'use server';

import { connectToDB } from '@/db';
import { Btech, StatsFormProps } from '@/db/models/btech.model';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function add_stats(formdata: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  const year = formdata.get('year');
  const lowestpackage = formdata.get('lowestpackage');
  const lowestpackageunit = formdata.get('lowestpackageunit');
  const medianpackage = formdata.get('medianpackage');
  const medianpackageunit = formdata.get('medianpackageunit');
  const averagepackage = formdata.get('averagepackage');
  const averagepackageunit = formdata.get('averagepackageunit');
  const highestpackageoncampus = formdata.get('highestpackageoncampus');
  const highestpackageoncampusunit = formdata.get('highestpackageoncampusunit');
  const highestpackageoffcampus = formdata.get('highestpackageoffcampus');
  const highestpackageoffcampusunit = formdata.get(
    'highestpackageoffcampusunit',
  );
  const noofcompaniesvisited = formdata.get('noofcompaniesvisited');
  const placementpercentage = formdata.get('placementpercentage');

  if (
    !year ||
    !lowestpackage ||
    !lowestpackageunit ||
    !medianpackage ||
    !medianpackageunit ||
    !averagepackage ||
    !averagepackageunit ||
    !highestpackageoncampus ||
    !highestpackageoncampusunit ||
    !noofcompaniesvisited ||
    !placementpercentage
  ) {
    throw new Error('All fields are required!');
  }
  let data;
  try {
    await connectToDB();
    data = await Btech.findOne({ year: year });
  } catch (error) {
    throw new Error('Something went wrong');
  }

  if (data) {
    throw new Error('Data already exists for this year');
  }

  try {
    await connectToDB();
    await Btech.create({
      year,
      lowestpackage,
      lowestpackageunit,
      medianpackage,
      medianpackageunit,
      averagepackage,
      averagepackageunit,
      highestpackageoncampus,
      highestpackageoncampusunit,
      highestpackageoffcampus,
      highestpackageoffcampusunit,
      noofcompaniesvisited,
      placementpercentage,
    });
    console.log('Data Added successfully!');
  } catch (error) {
    console.log(error);
    throw new Error('Error while adding data');
  }
  revalidatePath('/btech_statistics');
  redirect('/btech_statistics');
}

export async function get_btech_stats() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  try {
    await connectToDB();
    const stats: StatsFormProps[] = await Btech.find({}).select('-__v');
    return stats;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch stats');
  }
}

export async function get_btech_stats_by_id(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  try {
    await connectToDB();
    const stats: StatsFormProps | null = await Btech.findById(id);
    if (!stats) {
      throw new Error('Stats not found');
    }
    return stats;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch stats');
  }
}

export async function update_stats(formdata: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  const year = formdata.get('year');
  const lowestpackage = formdata.get('lowestpackage');
  const lowestpackageunit = formdata.get('lowestpackageunit');
  const medianpackage = formdata.get('medianpackage');
  const medianpackageunit = formdata.get('medianpackageunit');
  const averagepackage = formdata.get('averagepackage');
  const averagepackageunit = formdata.get('averagepackageunit');
  const highestpackageoncampus = formdata.get('highestpackageoncampus');
  const highestpackageoncampusunit = formdata.get('highestpackageoncampusunit');
  const highestpackageoffcampus = formdata.get('highestpackageoffcampus');
  const highestpackageoffcampusunit = formdata.get(
    'highestpackageoffcampusunit',
  );
  const noofcompaniesvisited = formdata.get('noofcompaniesvisited');
  const placementpercentage = formdata.get('placementpercentage');

  if (
    !year ||
    !lowestpackage ||
    !lowestpackageunit ||
    !medianpackage ||
    !medianpackageunit ||
    !averagepackage ||
    !averagepackageunit ||
    !highestpackageoncampus ||
    !highestpackageoffcampusunit ||
    !noofcompaniesvisited ||
    !placementpercentage
  ) {
    throw new Error('All fields are required!');
  }
  try {
    await connectToDB();
    await Btech.findOneAndUpdate(
      { year },
      {
        lowestpackage,
        lowestpackageunit,
        medianpackage,
        medianpackageunit,
        averagepackage,
        averagepackageunit,
        highestpackageoncampus,
        highestpackageoncampusunit,
        highestpackageoffcampus,
        highestpackageoffcampusunit,
        noofcompaniesvisited,
        placementpercentage,
      },
    );
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update user!');
  }
  revalidatePath('/btech_statistics');
  redirect('/btech_statistics');
}

export async function delete_btech_stats(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  if (!id) {
    throw new Error('Id is required!');
  }
  try {
    await connectToDB();
    await Btech.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete user!');
  }
  revalidatePath('/btech_statistics');
}
