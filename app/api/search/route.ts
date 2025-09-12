import Dish from "@/app/models/Dish";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const dishName = req.nextUrl.searchParams.get("name");
  try {
    const res = await Dish.find({
      name: { $regex: dishName, $options: "i" },
    }).sort({ createdAt: -1 });

    if (!res || res.length === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
