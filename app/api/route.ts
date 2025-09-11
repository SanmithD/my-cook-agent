import { connectDB } from "@/app/lib/db";
import Dish from "@/app/models/Dish";
import { NextResponse } from "next/server";

export const GET = async() =>{
    await connectDB();

    const dishes = await Dish.find();
    return NextResponse.json(dishes);
}

export const POST = async(req: Request) =>{
    await connectDB();

    const body = req.json();
    const dish = await Dish.create(body);

    return NextResponse.json(dish);
}