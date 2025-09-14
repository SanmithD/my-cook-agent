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
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (id) findDishById(id as string);
  }, [id, findDishById]);

  const handleStart = async () => {
    await getAgentRecipe(id as string, substitute);
  };

  const handleBack = () => {
    resetAgent();
    router.push("/");
    stopListening();
  };

  
const handleSpeak = () => {
  if (!agentResult) return;

  if (speaking) {
    speechSynthesis.cancel();
    setSpeaking(false);
  } else {
    const utterance = new SpeechSynthesisUtterance(agentResult);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
    setSpeaking(true);
  }
};


  return (
    <main className="p-6 max-w-7xl mx-auto">
      <button
        onClick={handleBack}
        className="w-fit mb-6 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      {loading && <p className="text-gray-600">Loading...</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {!loading && recipe && (
          <div className="p-6 border rounded-2xl shadow-md">
            {recipe.image && (
              <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h1 className="text-3xl font-bold mb-6">{recipe.name}</h1>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Steps</h3>
              <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                {recipe.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          </div>
        )}

        <div className="p-6 border rounded-2xl shadow-md flex flex-col">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter substitution (optional)"
              value={substitute}
              onChange={(e) => setSubstitute(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleStart}
              disabled={agentLoading}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 transition"
            >
              {agentLoading ? "Preparing..." : "Start"}
            </button>
          </div>

          {agentResult && (
            <div className="mt-4 p-5 border rounded-xl flex-1 overflow-y-auto max-h-[500px]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold">👩‍🍳 Step-by-Step Guide</h2>
                <button
                  onClick={handleSpeak}
                  className={`${speaking ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700' }  text-white px-3 py-1 rounded-md shadow transition`}
                >
                  🔊 { speaking ? "Stop" : "Speak" }
                </button>
              </div>
              <p className="whitespace-pre-line text-gray-500 leading-relaxed">
                {agentResult}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Recipe;
