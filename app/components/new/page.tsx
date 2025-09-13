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
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();
  const loading = UseDishStore((state) => state.loading);
  const addRecipe = UseDishStore((state) => state.addRecipe);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDishData({ ...dishData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", dishData.name);
    formData.append("ingredients", dishData.ingredients);
    formData.append("steps", dishData.steps);
    if (image) {
      formData.append("image", image);
    }

    await addRecipe(formData); // ✅ single call to Cloudinary + DB
    router.push("/");
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-fit px-4 py-1.5 font-medium tracking-wide cursor-pointer bg-blue-500 hover:bg-blue-800 rounded-md text-white"
      >
        Back
      </button>

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
          required
        />

        <textarea
          placeholder="Steps (each step on a new line)"
          value={dishData.steps}
          name="steps"
          onChange={handleChange}
          className="border p-2 rounded"
          rows={5}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mt-2"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </main>
  );
}

export default AddNewDish;
