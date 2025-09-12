import { agent } from "@/app/lib/cookingAgent";
import Dish from "@/app/models/Dish";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { substitute } = await req.json();
    const dish = await Dish.findById(params.id);

    if (!dish) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const res = await agent.invoke({
      messages: [
        {
          role: "user",
          content: `I want to cook ${dish.name}. 
Here are the original ingredients: ${dish.ingredients.join(", ")}. 
Steps: ${dish.steps.join(", ")}. 

User wants to substitute ingredient with: ${substitute}. 
Help me cook step by step considering this substitution.`,
        },
      ],
    });

    const lastMessage = res.messages[res.messages.length - 1];

    return NextResponse.json({ result: lastMessage.content }, { status: 200 });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
