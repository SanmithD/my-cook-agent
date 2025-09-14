"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RecipeList = () => {
  const router = useRouter();
  const { recipes, fetchRecipe, loading } = UseDishStore();

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-lg font-medium text-gray-500">Loading recipes...</p>
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-lg font-medium text-gray-400">No recipes found</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-3" >
      <h1 className="text-2xl font-bold mb-6">
        🍳 Latest Recipes
      </h1>
      <button onClick={()=>router.push('/components/new')} className="w-fit px-4 py-2 font-bold tracking-wide rounded-md cursor-pointer bg-blue-500 hover:bg-blue-700" >Add Dish</button>
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
