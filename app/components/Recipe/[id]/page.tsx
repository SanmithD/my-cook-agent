"use client";

import { useSpeechRecognition } from "@/app/hook/useSpeechRecognition ";
import { UseAgentStore } from "@/app/store/UseAgentStore";
import { UseDishStore } from "@/app/store/UseDishStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Recipe() {
  const router = useRouter();
  const { id } = useParams();
  const findDishById = UseDishStore((state) => state.findDishById);
  const recipe = UseDishStore((state) => state.selectedRecipe);
  const loading = UseDishStore((state) => state.loading);

  const getAgentRecipe = UseAgentStore((state) => state.getAgentRecipe);
  const resetAgent = UseAgentStore((state) => state.resetAgent);
  const agentLoading = UseAgentStore((state) => state.agentLoading);
  const agentResult = UseAgentStore((state) => state.agentResult);

  const { listening, transcript, startListening, stopListening } =
    useSpeechRecognition();

  const [substitute, setSubstitute] = useState("");

  useEffect(() => {
    if (id) findDishById(id as string);
  }, [id, findDishById]);

  const handleStart = async () => {
    await getAgentRecipe(id as string, substitute);
  };

  const handleBack = () => {
    resetAgent();
    router.push("/");
  };

  // Speak the agentResult using Web Speech API
  const handleSpeak = () => {
    if (!agentResult) return;
    const utterance = new SpeechSynthesisUtterance(agentResult);
    utterance.lang = "en-US";
    utterance.rate = 1; // speed
    utterance.pitch = 1; // tone
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="w-fit mb-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-700"
      >
        ← Back
      </button>

      {loading && <p>Loading...</p>}

      {!loading && recipe && (
        <div className="p-6 border rounded-xl shadow-lg">
          {recipe.image && (
            <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc ml-6 space-y-1">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Steps</h3>
            <ol className="list-decimal ml-6 space-y-1">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter substitution (optional)"
          value={substitute}
          onChange={(e) => setSubstitute(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleStart}
          disabled={agentLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {agentLoading ? "Preparing..." : "Start"}
        </button>
      </div>

      {agentResult && (
        <div className="mt-6 p-4 border rounded-lg max-h-[400px] overflow-y-auto whitespace-pre-line">
          <h2 className="text-xl font-bold mb-2">👩‍🍳 Step-by-Step Guide</h2>
          <button
            onClick={handleSpeak}
            className="bg-blue-600 text-white px-3 py-1 rounded mb-2 hover:bg-blue-700"
          >
            🔊 Speak
          </button>
          <p>{agentResult}</p>
        </div>
      )}
    </main>
  );
}

export default Recipe;
