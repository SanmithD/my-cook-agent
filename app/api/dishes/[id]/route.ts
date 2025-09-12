import { connectDB } from "@/app/lib/db";
import Dish from "@/app/models/Dish";
import { NextResponse } from "next/server";

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const dish = await Dish.findById(params.id);
    if (!dish) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(dish, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const DELETE = async(req: Request, { params } : { params: { id: string } }) =>{
    await connectDB();

    const response = await Dish.findByIdAndDelete(params.id);
    if(!response) return NextResponse.json({ message: "Dish not found" },{ status: 200 });

    return NextResponse.json(response)
}

export const PUT = async(req: Request, { params } : { params: { id: string } }) =>{
    await connectDB();

    const body = req.json();
    const updated = await Dish.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated)
}