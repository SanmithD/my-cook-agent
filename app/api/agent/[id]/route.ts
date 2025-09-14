import { generateRecipeInstructions } from "@/app/lib/generateRecipeInstructions";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { substitute } = await req.json();

    const text = await generateRecipeInstructions(params.id, substitute)

    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
