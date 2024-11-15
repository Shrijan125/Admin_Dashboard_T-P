import { StatsFormProps } from "@/db/models/btech.model";
import { Mtech } from "@/db/models/mtech.model";
import { NextResponse} from "next/server"

export async function GET() {
    try {
        const data : StatsFormProps[]= await Mtech.find({});
        return NextResponse.json(data,{status:200});
    } catch (error) {
        return NextResponse.json({message: 'Failed to get Data'},{status:500});
    }
  }