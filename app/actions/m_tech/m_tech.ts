'use server';

import { connectToDB } from "@/db";
import { StatsFormProps } from "@/db/models/btech.model";
import { Mtech } from "@/db/models/mtech.model";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function  add_stats_mtech (formdata: FormData) {
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
    const noofcompaniesvisited = formdata.get('noofcompaniesvisited');
    const placementpercentage = formdata.get('placementpercentage');

    if(!year || !lowestpackage || !lowestpackageunit ||  !averagepackage || !averagepackageunit || !highestpackageoncampus || !highestpackageoncampusunit || !placementpercentage) {
        throw new Error('All fields are required!');
    }
    
    let data;
    try {
        data= await Mtech.findOne({year  : year});
    } catch (error) {
        throw new Error('Something went wrong');
        
    }

    if(data) {
        throw new Error('Data already exists for this year');
    }
    
    try {
        await Mtech.create({
            year,
            lowestpackage,
            lowestpackageunit,
            medianpackage: medianpackage || '',
            medianpackageunit: medianpackageunit || '',
            averagepackage,
            averagepackageunit,
            highestpackageoncampus,
            highestpackageoncampusunit,
            noofcompaniesvisited,
            placementpercentage
        });
    }
    catch(error){
        console.log(error);
        throw new Error('Error while adding data');
    }
    revalidatePath('/mtech_statistics');
    redirect('/mtech_statistics');
}

export async function get_mtech_stats() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    try {
      connectToDB();
      const stats: StatsFormProps[] = await Mtech.find({}).select('-__v');
      return stats;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch stats');
    }
  }

export async function get_mtech_stats_by_id(id: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    let stats: StatsFormProps | null;
    try {
      connectToDB();
      stats = await Mtech.findById(id).select('-__v');
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch stats');
    }
    if(!stats)
    {
      throw new Error('Stats not found');
    }
    return stats;
  }
  

  export async function update_mtech_stats(formdata: FormData) {
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
      !averagepackage ||
      !averagepackageunit ||
      !highestpackageoncampus ||
      !highestpackageoncampusunit ||
      !placementpercentage
    ) {
      throw new Error('All fields are required!');
    }
    try {
      connectToDB();
      await Mtech.findOneAndUpdate(
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
    revalidatePath('/mtech_statistics');
    redirect('/mtech_statistics');
  }

  export async function delete_mtech_stats(id: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    if (!id) {
      throw new Error('Id is required!');
    }
    try {
      connectToDB();
      await Mtech.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete user!');
    }
    revalidatePath('/mtech_statistics');
  }
  