"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SearchPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const searchDish = UseDishStore((state) => state.searchDish);
  const searchRecipe = UseDishStore((state) => state.searchRecipe);
  const loading = UseDishStore((state) => state.searchLoading);

  useEffect(() => {
    if (!name.trim()) return;

    const handler = setTimeout(() => {
      searchRecipe(name);
    }, 500);

    return () => clearTimeout(handler);
  }, [name, searchRecipe]);

  return (
    <main className="p-6 w-2xl md:w-[70%] mx-auto">
      <div className="relative w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="text-3xl md:text-4xl font-bold italic text-cyan-100">
            CookMate
          </h1>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="🔍 Search your favorite recipe..."
            className="ml-6 flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {name.trim() && (
          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
            {loading && (
              <p className="p-3 text-gray-500 text-sm">Searching...</p>
            )}

            {!loading && searchDish.length === 0 && (
              <p className="p-3 text-gray-500 text-sm">No recipes found</p>
            )}

            <div className="divide-y">
              {searchDish.map((dish) => (
                <div
                  key={dish._id}
                  onClick={() => router.push(`/components/Recipe/${dish._id}`)}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition"
                >
                  <Image
                    src={dish.image || "/placeholder.jpg"}
                    alt={dish.name}
                    width={30}
                    height={30}
                    className="rounded object-cover"
                  />
                  <h2 className="text-base font-medium">{dish.name}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
