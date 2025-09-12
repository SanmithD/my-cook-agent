"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function Recipe() {
  const { id } = useParams();
  const findDishById = UseDishStore((state) => state.findDishById);
  const recipe = UseDishStore((state) => state.selectedRecipe);
  const loading = UseDishStore((state) => state.loading);

  useEffect(() => {
    if (id) {
      findDishById(id as string);
    }
  }, [id, findDishById]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      {loading && <p>Loading...</p>}

      {!loading && recipe && (
        <div className="p-4 border rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>

          <h3 className="font-semibold">Ingredients:</h3>
          <ul className="list-disc ml-6">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4">Steps:</h3>
          <ol className="list-decimal ml-6">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Start
        </button>
      </div>
    </main>
  );
}

export default Recipe;
