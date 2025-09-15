"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipeList() {
  const router = useRouter();
  const { recipes, fetchRecipe, loading } = UseDishStore();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setPage(1);
    fetchRecipe(selectedCategory, 1);
  }, [selectedCategory, fetchRecipe]);
  
  useEffect(() => {
    if (page > 1) {
      fetchRecipe(selectedCategory, page);
    }
  }, [page, selectedCategory, fetchRecipe]);

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
            className="text-[14px] md:text-[20px] w-fit px-2 md:px-4 py-2 font-bold tracking-wide rounded-md cursor-pointer bg-blue-500 hover:bg-blue-700 text-white"
          >
            Add Dish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        { loading && page === 1  ? (
           <div className="flex items-center justify-center h-40">
        <p className="text-lg font-medium text-gray-500">Loading recipes...</p>
      </div>
        ) : (
          recipes.map((data) => (
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
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
  
              <h2 className="text-lg font-semibold group-hover:text-blue-600">
                {data.name}
              </h2>
            </div>
          ))
        ) }
        
      </div>

      {!loading && recipes.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
};
