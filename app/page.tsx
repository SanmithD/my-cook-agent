"use client";

import SearchPage from "./components/find/page";
import { RecipeList } from "./components/RecipeList/page";

export default function Home() {
  return (
    <div>
      <div className="flex gap-3 h-fit" >
      <SearchPage/>
      </div>
      <RecipeList/>
    </div>
  );
}
