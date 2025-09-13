"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SearchPage() {
    const router = useRouter();
  const [name, setName] = useState("");

  const searchDish = UseDishStore((state) => state.searchDish);
  const searchRecipe = UseDishStore((state) => state.searchRecipe);
  const loading = UseDishStore((state) => state.loading);

  useEffect(() => {
    if (!name.trim()) return;

    const handler = setTimeout(() => {
      searchRecipe(name);
    }, 500);

    return () => clearTimeout(handler);
  }, [name, searchRecipe]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter dish name"
          className="flex-1 border rounded px-3 py-2"
        />
      </div>

      <div className="relative z-50" >
        {loading && <p>Loading...</p>}
        {!loading && searchDish.length === 0 && (
          <p className="text-gray-500">No recipes found</p>
        )}

        <div className="space-y-4">
          {searchDish.map((dish) => (
            <div
              key={dish._id}
              onClick={()=>router.push(`/components/Recipe/${dish._id}`)}
              className="p-4 border cursor-pointer hover:bg-gray-500 rounded-lg shadow hover:shadow-md"
            >
              <h2 className="text-lg font-bold">{dish.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
