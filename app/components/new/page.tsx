"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddNewDish() {
  const [dishData, setDishData] = useState({
    name: "",
    ingredients: "",
    steps: "",
  });

  const router = useRouter();
  const { addRecipe, loading } = UseDishStore((state) => ({
    addRecipe: state.addRecipe,
    loading: state.loading,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDishData({ ...dishData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDish = {
      name: dishData.name,
      ingredients: dishData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      steps: dishData.steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    await addRecipe(newDish);
    router.push("/");
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Dish name"
          name="name"
          value={dishData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Ingredients (comma separated)"
          value={dishData.ingredients}
          name="ingredients"
          onChange={handleChange}
          className="border p-2 rounded"
          rows={3}
        />

        <textarea
          placeholder="Steps (each step on a new line)"
          value={dishData.steps}
          name="steps"
          onChange={handleChange}
          className="border p-2 rounded"
          rows={5}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </main>
  );
}

export default AddNewDish;
