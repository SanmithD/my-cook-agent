import { generateRecipeInstructions } from "@/app/lib/generateRecipeInstructions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { substitute } = await req.json();

    const { id } = await context.params;

    const text = await generateRecipeInstructions(id, substitute);

    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
