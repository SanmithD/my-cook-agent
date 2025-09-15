import Dish from "../models/Dish";
import { agent } from "./cookingAgent";

export async function generateRecipeInstructions(
  dishId: string,
  substitute?: string
) {
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
  const maybeResp = response as unknown;
  if (
    typeof maybeResp === "object" &&
    maybeResp !== null &&
    "messages" in maybeResp
  ) {
    const msgs = (maybeResp as { messages?: unknown }).messages;
    if (Array.isArray(msgs)) {
      type Msg = { constructor?: { name?: unknown }; content?: unknown };
      const aiMessage = msgs
        .slice()
        .reverse()
        .find((m): m is Msg => {
          return (
            typeof m === "object" && 
            m !== null &&
            typeof (m as Msg).constructor?.name === "string" &&
            ((m as Msg).constructor!.name === "AIMessageChunk" ||
              (m as Msg).constructor!.name === "AIMessage")
          );
        });

      if (aiMessage && typeof aiMessage.content === "string") {
        resultText = aiMessage.content;
      }
    }
  }

  return resultText;
}
