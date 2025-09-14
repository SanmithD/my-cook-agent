"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const RecipeList = () => {
  const router = useRouter();
  const { recipes, fetchRecipe, loading } = UseDishStore();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchRecipe(selectedCategory === "all" ? undefined : selectedCategory);
  }, [selectedCategory, fetchRecipe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-lg font-medium text-gray-500">Loading recipes...</p>
      </div>
    );
  }

  // if (!recipes.length) {
  //   return (
  //     <div className="flex items-center justify-center h-40">
  //       <p className="text-lg font-medium text-gray-400">No recipes found</p>
  //     </div>
  //   );
  // }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] md:text-2xl font-bold">Latest Recipes</h1>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border bg-gray-700 p-2 rounded-md"
          >
            <option value="all">All</option>
            <option value="main-course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
            <option value="appetizer">Appetizer</option>
            <option value="salad">Salad</option>
            <option value="soup">Soup</option>
            <option value="snacks">Snacks</option>
          </select>

          <button
            onClick={() => router.push("/components/new")}
            className="w-fit px-4 py-2 font-bold tracking-wide rounded-md cursor-pointer bg-blue-500 hover:bg-blue-700 text-white"
          >
            Add Dish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((data) => (
          <div
            key={data._id}
            onClick={() => router.push(`/components/Recipe/${data._id}`)}
            className="group border rounded-2xl shadow-sm hover:shadow-md transition p-4 cursor-pointer"
          >
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
              <Image
                src={data.image || "/placeholder.jpg"}
                alt={data.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <h2 className="text-lg font-semibold group-hover:text-blue-600">
              {data.name}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
};
