import { connectDB } from "@/app/lib/db";
import Dish from "@/app/models/Dish";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const dishes = await Dish.find().sort({ createdAt: -1 });
    return NextResponse.json(dishes, { status: 200 });
  } catch (error) {
    console.error("GET /api/dishes error:", error);
    return NextResponse.json({ error: "Failed to fetch dishes" }, { status: 500 });
  }
};


export const POST = async (req: Request) => {
  try {
    await connectDB();

    const body = await req.json();
    const dish = await Dish.create(body);

    return NextResponse.json(dish, { status: 201 });
  } catch (error) {
    console.error("POST /api/dishes error:", error);
    return NextResponse.json({ error: "Failed to add dish" }, { status: 500 });
  }
};