"use client";

import { useRouter } from "next/navigation";
import SearchPage from "./components/find/page";
import { RecipeList } from "./components/RecipeList/page";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="flex gap-3 h-fit" >
      <SearchPage/>
      <button onClick={()=>router.push('/components/new')} className="w-fit px-4 py-1.5 bg-blue-500" >Add Dish</button>
      </div>
      <RecipeList/>
    </div>
  );
}
