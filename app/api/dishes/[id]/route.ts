import { connectDB } from "@/app/lib/db";
import Dish from "@/app/models/Dish";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const dish = await Dish.findById(id);
    if (!dish) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(dish, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const response = await Dish.findByIdAndDelete(id);
  if (!response) {
    return NextResponse.json({ message: "Dish not found" }, { status: 404 });
  }

  return NextResponse.json(response, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const body = await req.json();
  const updated = await Dish.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json(updated, { status: 200 });
}
