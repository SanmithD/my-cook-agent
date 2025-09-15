import { generateRecipeInstructions } from "@/app/lib/generateRecipeInstructions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  ctx: RouteContext<'/api/agent/[id]'>
) {
  try {
    const body = await req.json() as { substitute?: string };
    const { substitute } = body;
    const { id } = await ctx.params;

    const text: string = await generateRecipeInstructions(id, substitute);

    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Agent error:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    console.error("Agent unknown error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
