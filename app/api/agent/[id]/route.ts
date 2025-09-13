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
      return NextResponse.json({ message: "Dish not found" }, { status: 404 });
    }

    const response = await agent.invoke({
      messages: [
        {
          role: "user",
          content: `I want to cook ${dish.name}.
                    Ingredients: ${dish.ingredients.join(", ")}.
                    Steps: ${dish.steps.join(", ")}.
                    Substitute: ${substitute || "no substitutions"}.
                    Please explain step by step.`,
        },
      ],
    });

    let resultText = "";
    if ((response as any).messages?.length) {
      const aiMessage = (response as any).messages
        .reverse()
        .find((m: any) => m.constructor.name === "AIMessageChunk" || m.constructor.name === "AIMessage");
      if (aiMessage) resultText = aiMessage.content;
    }

    return NextResponse.json({ result: resultText }, { status: 200 });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
