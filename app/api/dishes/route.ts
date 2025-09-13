import { connectDB } from "@/app/lib/db";
import Dish from "@/app/models/Dish";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const ingredients = (formData.get("ingredients") as string) || "";
    const steps = (formData.get("steps") as string) || "";
    const file = formData.get("image") as File | null;

    let imageUrl = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "recipes" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const newDish = await Dish.create({
      name,
      ingredients: ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      steps: steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      image: imageUrl,
    });

    return NextResponse.json(newDish, { status: 201 });
  } catch (error) {
    console.error("POST /api/dishes error:", error);
    return NextResponse.json({ error: "Failed to add dish" }, { status: 500 });
  }
};
