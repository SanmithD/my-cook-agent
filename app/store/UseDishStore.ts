import axios from "axios";
import { create } from "zustand";

type Recipe = {
  _id?: string;
  name: string;
  ingredients: string[];
  steps: string[];
  image?: string;
  category: string;
};

type RecipeStore = {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  searchDish: Recipe[];
  loading: boolean;
  searchLoading: boolean;
  fetchRecipe: (category: string) => Promise<void>;
  addRecipe: (formData: FormData) => Promise<void>;
  searchRecipe: (name: string) => Promise<void>;
  findDishById: (_id: string) => Promise<void>;
};

export const UseDishStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  selectedRecipe: null,
  searchDish: [],
  loading: false,
  searchLoading: false,

  fetchRecipe: async (category?: string) => {
  set({ loading: true });
  try {
    const res = await axios.get(`/api/dishes?category=${category}`);
    set({ loading: false, recipes: res.data });
  } catch (error) {
    console.error("Fetch recipe error:", error);
    set({ loading: false });
  }
},


  addRecipe: async (formData) => {
    set({ loading: true });
    try {
      await axios.post("/api/dishes", formData); 
      set({ loading: false });
    } catch (error) {
      console.error("Add recipe error:", error);
      set({ loading: false });
    }
  },

  searchRecipe: async (name: string) => {
    set({ searchLoading: true });
    try {
      const res = await axios.get(`/api/search?name=${encodeURIComponent(name)}`);
      set({ searchLoading: false, searchDish: res.data });
    } catch (error) {
      console.error("Search recipe error:", error);
      set({ searchLoading: false });
    }
  },

  findDishById: async (id: string) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/dishes/${id}`);
      set({ loading: false, selectedRecipe: res.data });
    } catch (error) {
      console.error("Find dish error:", error);
      set({ loading: false });
    }
  },
}));
