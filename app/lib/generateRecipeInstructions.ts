import Dish from "../models/Dish";
import { agent } from "./cookingAgent";

export async function generateRecipeInstructions(dishId: string, substitute?: string) {
  const dish = await Dish.findById(dishId);
  if (!dish) throw new Error("Dish not found");

  const systemPrompt = `
You are a professional chef and cooking instructor.
Your job is to explain recipes step by step in a clear, friendly, and beginner-friendly way.
Formatting rules:
- Do NOT use em dashes (—), bold text (**), or markdown symbols.
- Keep everything in plain text with simple sentences.
- Use clear headings like "Introduction", "Ingredients", "Steps", and "Tips".
- Use numbered lists for steps and bullet points for ingredients.
- Keep language simple and natural, easy for beginners to follow.

Content rules:
- Start with a short introduction about the dish.
- List the ingredients clearly.
- Explain each step in detail, one by one.
- Add tips, alternatives, or substitutions naturally.
- If the user requested a substitution, include it clearly in the recipe.
`;

  const userPrompt = `
I want to cook ${dish.name}.
Ingredients: ${dish.ingredients.join(", ")}.
Steps: ${dish.steps.join(", ")}.
Substitute: ${substitute || "no substitutions"}.
Please explain step by step in detail.
`;

  const response = await agent.invoke({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  let resultText = "";
  if ((response as any).messages?.length) {
    const aiMessage = (response as any).messages
      .reverse()
      .find(
        (m: any) =>
          m.constructor.name === "AIMessageChunk" ||
          m.constructor.name === "AIMessage"
      );
    if (aiMessage) resultText = aiMessage.content;
  }

  return resultText;
}
