import { connectDB } from "@/app/lib/db";
import Dish from "@/app/models/Dish";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    let category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!category || category === "all" || category === "undefined" || category === "null") {
      category = "all";
    }

    const filter = category === "all" ? {} : { category };
    const dishes = await Dish.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

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

    const ingredientsRaw = (formData.get("ingredients") as string) || "";
    const stepsRaw = (formData.get("steps") as string) || "";

    const file = formData.get("image") as File | null;

    const categoryRaw = formData.get("category");
    let category =
      typeof categoryRaw === "string" && categoryRaw.trim() !== ""
        ? categoryRaw.trim()
        : "all";

    const validCategories = [
      "all",
      "main-course",
      "dessert",
      "drinks",
      "appetizer",
      "salad",
      "soup",
      "snacks",
    ];
    if (!validCategories.includes(category)) {
      category = "all";
    }

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

    const ingredients = ingredientsRaw
      .split(/,|\r?\n/)
      .map((i) => i.trim())
      .filter(Boolean);

    const steps = stepsRaw
      .split(/\r?\n/) 
      .map((s) => s.trim())
      .filter(Boolean);

    const newDish = await Dish.create({
      name,
      category, 
      ingredients,
      steps,
      image: imageUrl,
    });

    return NextResponse.json(newDish, { status: 201 });
  } catch (error) {
    console.error("POST /api/dishes error:", error);
    return NextResponse.json({ error: "Failed to add dish" }, { status: 500 });
  }
};

